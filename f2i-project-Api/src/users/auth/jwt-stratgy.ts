import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class JwtCustomStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private repo: Repository<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'iasojasjzdnncydbncsdqdq',
    });
  }

  async validate(payload: { id: number }) {
    const { id } = payload;
    const user = await this.repo.findBy({ id });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
