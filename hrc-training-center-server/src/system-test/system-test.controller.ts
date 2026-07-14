import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SystemTestService } from './system-test.service';
import { Public } from '@/auth/decorator/public.decorator';

@Controller('/api/system-test')
export class SystemTestController {
  constructor(private readonly systemTestService: SystemTestService) {}

  @Get('ok')
  @Public()
  ok() {
    return this.systemTestService.ok();
  }

  @Public()
  @Get('error')
  error() {
    return this.systemTestService.error();
  }

  @Get('public-route')
  @Public()
  testPublicRoute() {
    return this.systemTestService.testPublicRoute();
  }
}
