import { Module } from '@nestjs/common';
import { JeuxService } from './jeux.service';
import { JeuxController } from './jeux.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jeux } from './entities/jeux.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JeuxDetailsModule } from 'src/jeux-details/jeux-details.module';
import { JeuxDetails } from 'src/jeux-details/entities/jeux-details.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Jeux, JeuxDetails, Ticket]),
    JeuxDetailsModule,
    JwtModule.register({
      secret: 'iasojasjzdnncydbncsdqdq',
      signOptions: {
        algorithm: 'HS512',
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [JeuxController],
  providers: [JeuxService, JwtService],
})
export class JeuxModule {}
