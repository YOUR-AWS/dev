import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JeuxDetails } from './entities/jeux-details.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JeuxDetailsService {
  constructor(
    @InjectRepository(JeuxDetails)
    private jeuxDetailsRepository: Repository<JeuxDetails>,
  ) {}
}
