import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PolicyMetadata } from '../interfaces/policy.interface';
import { POLICY_KEY } from '../decorator/require-policy.decorator';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const policy = this.reflector.getAllAndOverride<PolicyMetadata>(
      POLICY_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Nếu không có decorator @RequirePolicy, cho qua
    if (!policy) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Tài khoản chưa được xác thực');
    }

    const userRoles: string[] = user.roles || [];
    const userPermissions: string[] = user.permissions || [];

    let isAuthorized = false;

    // 1. Xét theo ROLE (Nếu có)
    if (policy.roles && policy.roles.length > 0) {
      const hasRequiredRole = policy.roles.some((role) =>
        userRoles.includes(role),
      );
      if (hasRequiredRole) {
        isAuthorized = true;
      }
    }

    // 2. Xét theo PERMISSION (Nếu chưa pass qua Role)
    if (!isAuthorized && policy.permissions && policy.permissions.length > 0) {
      const hasRequiredPermissions = policy.permissions.some(
        (permissionSet) => {
          // Phải có TẤT CẢ các quyền trong một tập hợp con
          return permissionSet.every((perm) => userPermissions.includes(perm));
        },
      );

      if (hasRequiredPermissions) {
        isAuthorized = true;
      }
    }

    // 3. Chốt kết quả
    if (!isAuthorized) {
      throw new ForbiddenException(
        'Bạn không đủ quyền hạn (Role/Permission) để truy cập tài nguyên này.',
      );
    }

    return true;
  }
}
