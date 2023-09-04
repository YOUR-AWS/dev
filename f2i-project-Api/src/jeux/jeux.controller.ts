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
import { JeuxService } from './jeux.service';
import { CreateJeuxDto } from './dto/create-jeux.dto';
import { UpdateJeuxDto } from './dto/update-jeux.dto';
import { JwtAuthGuard } from 'src/users/guards/auth-guard';
import { CurrentUser } from 'src/users/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/users/guards/RolesGuard';
import { Roles } from 'src/users/decorators/roles.decorator';

@Controller('jeux')
@UseGuards(JwtAuthGuard)
//@Roles('admin')
@ApiTags('Jeux de Concoure')
export class JeuxController {
  constructor(private readonly jeuxService: JeuxService) {}

  @Post()
  @ApiBearerAuth('jwt')
  create(@Body() createJeuxDto: CreateJeuxDto, @CurrentUser() user: User) {
    return this.jeuxService.create(createJeuxDto, user);
  }

  @Get()
  @ApiBearerAuth('jwt')
  findAll(@CurrentUser() user: User) {
    return this.jeuxService.findAll(user);
  }

  @Get('/tirages')
  @ApiBearerAuth('jwt')
  tirage(@CurrentUser() user: User) {
    return this.jeuxService.tirage(user);
  }

  @Get(':id')
  @ApiBearerAuth('jwt')
  findOne(@Param('id') id: number, @CurrentUser() user: User) {
    return this.jeuxService.findOne(id, user);
  }

  @Patch(':id')
  @ApiBearerAuth('jwt')
  update(
    @Param('id') id: string,
    @Body() updateJeuxDto: UpdateJeuxDto,
    @CurrentUser() user: User,
  ) {
    return this.jeuxService.update(+id, updateJeuxDto, user);
  }

  @Delete(':id')
  @ApiBearerAuth('jwt')
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.jeuxService.remove(+id, user);
  }
}
