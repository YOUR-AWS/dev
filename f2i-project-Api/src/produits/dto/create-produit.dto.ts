import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProduitDto {
  @IsString()
  @IsNotEmpty()
  nomDeProduit: string;

  @IsNumber()
  @IsNotEmpty()
  prix: number;

  @IsString()
  @IsNotEmpty()
  discription: string;

  @IsString()
  @IsNotEmpty()
  stock: number;
}
