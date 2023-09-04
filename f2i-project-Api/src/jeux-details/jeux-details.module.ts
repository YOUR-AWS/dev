import { Module } from '@nestjs/common';
import { JeuxDetailsService } from './jeux-details.service';
import { JeuxDetailsController } from './jeux-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JeuxDetails } from './entities/jeux-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JeuxDetails])],
  controllers: [JeuxDetailsController],
  providers: [JeuxDetailsService],
  exports: [JeuxDetailsService],
})
export class JeuxDetailsModule {}
