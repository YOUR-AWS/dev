import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtCustomStrategy } from './auth/jwt-stratgy';
// import { TicketsService } from 'src/tickets/tickets.service';
// import { IsAdminPipe } from './pipe/is-admin.pipe';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'iasojasjzdnncydbncsdqdq',
      signOptions: {
        algorithm: 'HS512',
        expiresIn: '1d',
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtCustomStrategy],
  exports: [UsersService, PassportModule, JwtCustomStrategy],
})
export class UsersModule {}
