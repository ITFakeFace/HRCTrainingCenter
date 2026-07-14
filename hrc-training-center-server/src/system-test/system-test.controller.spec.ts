import { Test, TestingModule } from '@nestjs/testing';
import { SystemTestController } from './system-test.controller';
import { SystemTestService } from './system-test.service';

describe('SystemTestController', () => {
  let controller: SystemTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemTestController],
      providers: [SystemTestService],
    }).compile();

    controller = module.get<SystemTestController>(SystemTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
