import { Test, TestingModule } from '@nestjs/testing';
import { GainService } from './gain.service';

describe('GainService', () => {
  let service: GainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GainService],
    }).compile();

    service = module.get<GainService>(GainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
