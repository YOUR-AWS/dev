import { Injectable } from '@nestjs/common';
import { CreateGainDto } from './dto/create-gain.dto';
import { UpdateGainDto } from './dto/update-gain.dto';

@Injectable()
export class GainService {
  create(createGainDto: CreateGainDto) {
    return 'This action adds a new gain';
  }

  findAll() {
    return `This action returns all gain`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gain`;
  }

  update(id: number, updateGainDto: UpdateGainDto) {
    return `This action updates a #${id} gain`;
  }

  remove(id: number) {
    return `This action removes a #${id} gain`;
  }
}
