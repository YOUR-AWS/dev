import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile, Strategy } from 'passport-facebook';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(@InjectRepository(User) private repo: Repository<User>) {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/facebook/redirect',
      scope: 'email',
      profileFields: ['emails', 'name', 'image'],
    });
  }

  async validate(accessToken: string, profile: Profile) {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };
    const payload = {
      user,
      accessToken,
    };

    //done(null, payload);
  }
}
