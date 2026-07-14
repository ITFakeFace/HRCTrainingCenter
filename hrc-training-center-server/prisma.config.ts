import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    path: './prisma/migrations',
  },
  datasource: {
    // Gọi hàm env() để lấy giá trị từ file .env
    url: process.env.DATABASE_URL || env('DATABASE_URL'),
  },
});
