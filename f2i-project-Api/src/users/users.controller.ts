import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SerializeLogginDto } from './dto/serialize.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LogginDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/auth-guard';
import { User } from './entities/user.entity';
import { OAuth2Client } from 'google-auth-library';
import { GoogleLogginDto } from './dto/google-login.dto';

//const to get the info of the google auth
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Controller('users')
@ApiBearerAuth()
@ApiTags('User')
@Serialize(SerializeLogginDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiTags('auth')
  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiTags('auth')
  @ApiCreatedResponse({ type: LogginDto })
  @ApiBadRequestResponse()
  @Post('login')
  loggin(@Body() logginDto: LogginDto) {
    return this.authService.login(logginDto);
  }

  @ApiTags('auth')
  @ApiCreatedResponse({ type: GoogleLogginDto })
  @ApiBadRequestResponse()
  @Post('/google/login')
  async googleLoggin(@Body('token') token) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const data = await this.authService.googleLogin({
      email: payload.email,
      username: payload.name,
      image: payload.picture,
    });
    return data;
  }

  @Get()
  //@UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: User, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: User, description: 'Get a user with id' })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: User, description: 'update a user with id' })
  @ApiNotFoundResponse()
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: User, description: 'delete a user with id' })
  @ApiNotFoundResponse()
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
}
