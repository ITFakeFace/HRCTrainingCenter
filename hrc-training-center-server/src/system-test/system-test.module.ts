import { Module } from '@nestjs/common';
import { SystemTestService } from './system-test.service';
import { SystemTestController } from './system-test.controller';

@Module({
  controllers: [SystemTestController],
  providers: [SystemTestService],
})
export class SystemTestModule {}
