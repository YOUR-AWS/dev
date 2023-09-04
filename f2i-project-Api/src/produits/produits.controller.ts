import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { CurrentUser } from 'src/users/decorators/user.decorator';
import { JwtAuthGuard } from 'src/users/guards/auth-guard';
import { User } from 'src/users/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/users/guards/RolesGuard';
import { Roles } from 'src/users/decorators/roles.decorator';

@Controller('produits')
@UseGuards(JwtAuthGuard)
@ApiTags('produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) {}

  @Post()
  @ApiBearerAuth('jwt')
  @UseGuards(RolesGuard)
  @Roles('admin')
  create(
    @Body() createProduitDto: CreateProduitDto,
    @CurrentUser() user: User,
  ) {
    return this.produitsService.create(createProduitDto, user);
  }

  @Get()
  @ApiBearerAuth('jwt')
  findAll() {
    return this.produitsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('jwt')
  findOne(@Param('id') id: string) {
    return this.produitsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('jwt')
  @UseGuards(RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateProduitDto: UpdateProduitDto) {
    return this.produitsService.update(+id, updateProduitDto);
  }

  @Delete(':id')
  @ApiBearerAuth('jwt')
  @UseGuards(RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.produitsService.remove(+id);
  }
}
