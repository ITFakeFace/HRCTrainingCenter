import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  // THÊM HÀM NÀY ĐỂ DEBUG LỖI CỦA PASSPORT
  handleRequest(err, user, info, context) {
    console.log('--- DEBUG PASSPORT JWT ---');
    console.log('1. Lỗi hệ thống (err):', err);
    console.log('2. Dữ liệu user giải mã được:', user);
    console.log(
      '3. Thông tin lỗi Token (info):',
      info ? info.message : 'Không có thông báo lỗi',
    );
    console.log('--------------------------');

    // Logic mặc định của Passport: Nếu có lỗi hoặc không có user thì ném lỗi 401
    if (err || !user) {
      throw err || new UnauthorizedException('Không có quyền truy cập');
    }

    return user;
  }
}
