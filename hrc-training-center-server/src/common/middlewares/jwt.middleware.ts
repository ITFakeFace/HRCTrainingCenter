import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

// Định nghĩa lại Request type để TypeScript không báo lỗi khi gán req.user
interface AuthenticatedRequest extends Request {
  user?: any;
}

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      // Xác thực và giải mã token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'SECRET_KEY_CUA_BAN', // Phải khớp với bên Module
      });

      // Gắn payload vào request để các Controller phía sau có thể dùng
      req.user = payload;
      next();
    } catch (error) {
      throw new UnauthorizedException('Token đã hết hạn hoặc không hợp lệ');
    }
  }
}
