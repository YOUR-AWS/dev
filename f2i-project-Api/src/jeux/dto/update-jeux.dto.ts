import { PartialType } from '@nestjs/mapped-types';
import { CreateJeuxDto } from './create-jeux.dto';

export class UpdateJeuxDto extends PartialType(CreateJeuxDto) {}
