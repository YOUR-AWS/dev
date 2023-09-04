import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LogginDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
