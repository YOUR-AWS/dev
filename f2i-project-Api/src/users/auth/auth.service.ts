import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LogginDto } from '../dto/login-user.dto';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { GoogleLogginDto } from './../dto/google-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwt: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;
    //console.log(createUserDto);

    const exists = await this.userService.findOneByEmail(email);
    //console.log(exists);

    if (exists) {
      throw new UnauthorizedException('User alredy exist');
    }
    //const saltOrRounds = 12;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const user = new User();
    user.username = username;
    user.password = hash;
    user.email = email;

    return this.userService.create(user);
  }

  async login(loginDto: LogginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User ont found');
    }
    const { id, isAdmin } = user;
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const jwtPayload = { id, isAdmin };
      const jwtToken = await this.jwt.signAsync(jwtPayload, {
        expiresIn: '1d',
        algorithm: 'HS512',
      });
      return jwtToken;
    } else {
      throw new UnauthorizedException('error credential');
    }
  }

  async googleLogin(googleLogin: GoogleLogginDto) {
    const { email, username, image } = googleLogin;
    const userExists = await this.userService.findOneByEmail(email);
    if (!userExists) {
      const user = new User();
      user.username = username;
      user.email = email;
      user.image = image;

      return this.userService.create(user);
    } else {
      throw new NotFoundException('User ont found');
    }
  }
}
