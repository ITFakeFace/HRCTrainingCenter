import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemTestService {
  async ok() {
    return { message: 'System test OK' };
  }

  async error() {
    throw new Error('System test error');
  }

  async testPublicRoute() {
    return { message: 'This is a public route' };
  }
}
