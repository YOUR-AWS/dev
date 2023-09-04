import { Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { CreateProduitDto } from 'src/produits/dto/create-produit.dto';

export class CreateTicketDto {
  @IsNumber()
  @Expose()
  montant: number;

  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  @Expose()
  produitIds: number[];
}
