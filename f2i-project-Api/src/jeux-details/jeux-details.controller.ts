import { Controller } from '@nestjs/common';
import { JeuxDetailsService } from './jeux-details.service';

@Controller('jeux-details')
export class JeuxDetailsController {
  constructor(private readonly jeuxDetailsService: JeuxDetailsService) {}
}
