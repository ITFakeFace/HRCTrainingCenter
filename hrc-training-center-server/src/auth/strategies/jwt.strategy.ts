import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Điều chỉnh đường dẫn cho đúng

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService) {
    super({
      // Tự động lấy token từ header: Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Báo lỗi nếu token đã hết hạn
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  // Hàm này chỉ chạy khi Token HỢP LỆ và CHƯA HẾT HẠN
  // Payload chính là dữ liệu ta đã mã hóa lúc login ({ sub, email, pID })
  async validate(payload: { sub: string; email: string; pID: string }) {
    const user = await this.prisma.client.user.findUnique({
      where: { id: payload.sub }, // sub ở đây là UUID (id của user)
    });

    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại hoặc đã bị xóa');
    }

    // Tách bỏ password ra khỏi object user trước khi trả về
    const { password, ...userWithoutPassword } = user;

    // Dữ liệu return ở đây sẽ tự động được NestJS gắn vào `req.user`
    return userWithoutPassword;
  }
}
