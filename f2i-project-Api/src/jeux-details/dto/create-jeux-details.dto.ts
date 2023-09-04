import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateJeuxDetailsDto {
  @IsString()
  @Expose()
  nomPrix: string;

  @IsString()
  @Expose()
  typePrix: string;

  @IsNumber()
  @Expose()
  valeurPrix: number;

  @IsNumber()
  @Expose()
  nombreTicket: number;
}
