import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Expose } from 'class-transformer';

export class SerializeLogginDto extends PartialType(CreateUserDto) {
  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  image?: string;
}
