import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 1. Bật ValidationPipe để DTO hoạt động
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Lọc bỏ các trường không có trong DTO
    }),
  );

  // 2. Kích hoạt Interceptor định dạng request thành công
  app.useGlobalInterceptors(new TransformInterceptor());

  // 3. Kích hoạt Exception Filter định dạng request thất bại
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
