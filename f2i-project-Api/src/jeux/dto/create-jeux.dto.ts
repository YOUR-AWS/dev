import { Expose, Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsDate,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { CreateJeuxDetailsDto } from 'src/jeux-details/dto/create-jeux-details.dto';

export class CreateJeuxDto {
  @IsDate()
  @Expose()
  dateDebut: Date;

  @IsDate()
  @Expose()
  dateFin: Date;

  @IsNumber()
  @Expose()
  nombreDeTicketTotal: number;

  @IsString()
  @Expose()
  description: string;

  @ValidateNested({ each: true })
  @Type(() => CreateJeuxDetailsDto)
  @ArrayMinSize(1) // Ensure there's at least one JeuxDetails
  @Expose()
  jeuxDetails: CreateJeuxDetailsDto[];
}
