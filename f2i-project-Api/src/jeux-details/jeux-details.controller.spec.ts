import { Test, TestingModule } from '@nestjs/testing';
import { JeuxDetailsController } from './jeux-details.controller';
import { JeuxDetailsService } from './jeux-details.service';

describe('JeuxDetailsController', () => {
  let controller: JeuxDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JeuxDetailsController],
      providers: [JeuxDetailsService],
    }).compile();

    controller = module.get<JeuxDetailsController>(JeuxDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
