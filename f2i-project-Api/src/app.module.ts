import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';
import { JeuxModule } from './jeux/jeux.module';
import { JeuxDetailsModule } from './jeux-details/jeux-details.module';
import { ProduitsModule } from './produits/produits.module';
import { GainModule } from './gain/gain.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(config),
    TicketsModule,
    JeuxModule,
    JeuxDetailsModule,
    ProduitsModule,
    GainModule,
  ],
  controllers: [
    AppController,
    // JwtAuthGuard,
    // {
    //   provide: APP_PIPE,
    //   useValue: new ValidationPipe({
    //     whitelist: true,
    //   }),
    // },
  ],
  providers: [AppService],
})
export class AppModule {}
