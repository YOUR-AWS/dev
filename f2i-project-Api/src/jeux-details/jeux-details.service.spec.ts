import { Test, TestingModule } from '@nestjs/testing';
import { JeuxDetailsService } from './jeux-details.service';

describe('JeuxDetailsService', () => {
  let service: JeuxDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JeuxDetailsService],
    }).compile();

    service = module.get<JeuxDetailsService>(JeuxDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
