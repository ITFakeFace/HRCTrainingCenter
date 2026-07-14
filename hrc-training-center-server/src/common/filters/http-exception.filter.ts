// src/common/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch() // Bắt mọi loại lỗi
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Lỗi hệ thống nội bộ';
    let errors = null;

    // 1. Lỗi HTTP thông thường từ NestJS (Ví dụ: Unauthorized, BadRequest...)
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;

      // Bắt lỗi từ ValidationPipe (DTO) - thường trả về mảng các thông báo
      if (Array.isArray(exceptionResponse.message)) {
        message = 'Dữ liệu đầu vào không hợp lệ';
        errors = exceptionResponse.message; // Trả mảng lỗi DTO vào mảng errors
      } else {
        message = exceptionResponse.message || exception.message;
        errors = exceptionResponse.error || exception.message;
      }
    }
    // 2. Có thể cấu hình thêm để bắt các lỗi từ Prisma (Ví dụ: P2002)
    else if (exception instanceof Error) {
      // Trong môi trường dev có thể in ra lỗi gốc, production nên ẩn đi
      message = exception.message;
    }

    // Định dạng lại response
    response.status(statusCode).json({
      status: false,
      code: statusCode,
      message: message,
      data: null, // Có lỗi thì không có data
      errors: errors,
    });
  }
}
