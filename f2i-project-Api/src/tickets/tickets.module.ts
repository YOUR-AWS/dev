import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Jeux } from 'src/jeux/entities/jeux.entity';
import { Produit } from 'src/produits/entities/produit.entity';
import { Gain } from 'src/gain/entities/gain.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, Jeux, Produit, Gain]),
    JwtModule.register({
      secret: 'iasojasjzdnncydbncsdqdq',
      signOptions: {
        algorithm: 'HS512',
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [TicketsController],
  providers: [TicketsService, JwtService], // Include JwtService in the providers
  exports: [TicketsService],
})
export class TicketsModule {}
