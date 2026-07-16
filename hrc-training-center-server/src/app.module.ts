import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { JwtMiddleware } from './common/middlewares/jwt.middleware';
import { SystemTestModule } from './system-test/system-test.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PolicyGuard } from './auth/guards/policy.guard';
import { CoursesModule } from './courses/courses.module';
import { SessionsModule } from './sessions/sessions.module';
import { BatchesModule } from './batches/batches.module';
import { LessonsModule } from './lessons/lessons.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, SystemTestModule, RolesModule, PermissionsModule, CoursesModule, SessionsModule, BatchesModule, LessonsModule, CategoriesModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PolicyGuard,
    },
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(JwtMiddleware)
  //     .exclude({ path: 'auth/login', method: RequestMethod.POST }) // Bỏ qua route login
  //     .forRoutes('*'); // Áp dụng cho mọi route khác
  // }
}
