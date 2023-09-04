import { IsDate } from 'class-validator';

export class CreateGainDto {
  @IsDate()
  dateDeRecuperation: Date;

  @IsDate()
  dateLimiteDeRecuperation: Date;
}
