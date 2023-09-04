import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Produit } from './entities/produit.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProduitsService {
  constructor(
    @InjectRepository(Produit) private produitRepository: Repository<Produit>,
  ) {}

  async create(createProduitDto: CreateProduitDto, user: User) {
    const { nomDeProduit } = createProduitDto;

    const existProduct = await this.findOneByName(nomDeProduit);

    if (existProduct) {
      throw new ConflictException('Product with the same name already exists');
    }

    const newProduit = this.produitRepository.create(createProduitDto);
    newProduit.user = user;

    return this.produitRepository.save(newProduit);
  }

  findAll() {
    return this.produitRepository.find();
  }

  async findOne(id: number) {
    const produit = await this.produitRepository.findOneBy({ id });
    if (!produit) {
      throw new NotFoundException('produit does not exist or deleted');
    }
    return produit;
  }

  findOneByName(nomDeProduit: string) {
    return this.produitRepository.findOneBy({ nomDeProduit: nomDeProduit });
  }

  async findByIds(produitIds: number[]): Promise<Produit[]> {
    return this.produitRepository.find({ where: { id: In(produitIds) } });
  }

  async update(id: number, updateProduitDto: UpdateProduitDto) {
    const produit = await this.findOne(id);

    if (!produit) {
      throw new NotFoundException('produit not found');
    }
    Object.assign(produit, updateProduitDto);
    return this.produitRepository.save(produit);
  }

  async remove(id: number) {
    const produit = await this.findOne(id);

    if (!produit) {
      throw new NotFoundException('produit not found');
    }
    return this.produitRepository.remove(produit);
  }
}
