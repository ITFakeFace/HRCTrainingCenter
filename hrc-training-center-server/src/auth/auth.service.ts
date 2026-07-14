import { PrismaService } from '@/prisma/prisma.service';
import {
  Body,
  Injectable,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { HashUtil } from '@/common/utils/hash.util';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    // 1. Tìm User (Nhớ thêm include roles để lấy các role trực tiếp)
    const user = await this.prisma.client.user.findFirst({
      where: {
        OR: [{ email: dto.identifier }, { phone: dto.identifier }],
      },
      include: {
        roles: true, // Lấy các role tầng 1
      },
    });

    if (!user)
      throw new UnauthorizedException(
        'Tài khoản hoặc mật khẩu không chính xác',
      );

    // 2. Kiểm tra mật khẩu bằng Util
    const isMatch = await HashUtil.comparePassword(dto.password, user.password);
    if (!isMatch)
      throw new UnauthorizedException(
        'Tài khoản hoặc mật khẩu không chính xác',
      );

    // 3. Thuật toán BFS - Quét cây thừa kế để lấy toàn bộ Roles và Permissions
    const userRoles = new Set<string>();
    const userPermissions = new Set<string>();
    const visitedRoleIds = new Set<number>();

    // Đưa các role trực tiếp vào hàng đợi
    const roleQueue: number[] = user.roles.map((r) => r.id);

    while (roleQueue.length > 0) {
      const currentRoleId = roleQueue.shift();

      if (!currentRoleId || visitedRoleIds.has(currentRoleId)) continue; // Bỏ qua nếu đã quét
      visitedRoleIds.add(currentRoleId);

      // Truy vấn Role hiện tại kèm Quyền và Role con
      const roleData = await this.prisma.client.role.findUnique({
        where: { id: currentRoleId },
        include: {
          permissions: true,
          parentRoles: true, // Đổi thành parentRoles nếu logic kế thừa của bạn ngược lại
        },
      });

      if (roleData) {
        userRoles.add(roleData.shortname);

        // Phẳng hóa permissions theo định dạng RESOURCE_ACTION
        roleData.permissions.forEach((perm) => {
          userPermissions.add(`${perm.resource}_${perm.action}`);
        });

        // Đẩy các Role con vào hàng đợi để quét tiếp ở vòng lặp sau
        roleData.parentRoles.forEach((parent) => {
          roleQueue.push(parent.id);
        });
      }
    }

    // 4. Ký token với payload đã chứa đầy đủ quyền hạn
    const payload = {
      sub: user.id,
      email: user.email,
      pID: user.pID,
      roles: Array.from(userRoles),
      permissions: Array.from(userPermissions),
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  @Post('extract-token')
  async extractToken(token: string): Promise<any> {
    try {
      // Hàm này vừa giải mã, vừa check hạn, vừa check chữ ký bí mật
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'SECRET_KEY_CUA_BAN',
      });

      return payload;
      // Kết quả giống hàm decode, nhưng an toàn 100%
    } catch (error) {
      // Nếu token hết hạn, bị sửa đổi, hoặc chữ ký sai -> ném lỗi
      throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
    }
  }
}
