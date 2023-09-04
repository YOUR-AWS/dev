import { Module } from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { ProduitsController } from './produits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from './entities/produit.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Produit]),
    JwtModule.register({
      secret: 'iasojasjzdnncydbncsdqdq',
      signOptions: {
        algorithm: 'HS512',
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [ProduitsController],
  providers: [ProduitsService, JwtService],
})
export class ProduitsModule {}
