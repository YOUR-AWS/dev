import { Test, TestingModule } from '@nestjs/testing';
import { GainController } from './gain.controller';
import { GainService } from './gain.service';

describe('GainController', () => {
  let controller: GainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GainController],
      providers: [GainService],
    }).compile();

    controller = module.get<GainController>(GainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
