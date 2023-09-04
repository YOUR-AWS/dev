import { Module } from '@nestjs/common';
import { GainService } from './gain.service';
import { GainController } from './gain.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gain } from './entities/gain.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gain])],
  controllers: [GainController],
  providers: [GainService],
})
export class GainModule {}
