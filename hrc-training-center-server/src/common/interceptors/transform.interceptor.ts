import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface StandardResponse<T> {
  status: boolean;
  code: number;
  message: string;
  data: T | null;
  errors: any | null;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  StandardResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<StandardResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((res) => {
        // Cho phép Controller linh hoạt truyền custom message nếu muốn
        // Ví dụ return { message: 'Đăng nhập thành công', data: {...} }
        const message = res?.message || 'Thành công';
        const data = res?.data !== undefined ? res.data : res;

        return {
          status: true,
          code: statusCode,
          message: message,
          data: data,
          errors: null, // Request thành công thì không có errors
        };
      }),
    );
  }
}
