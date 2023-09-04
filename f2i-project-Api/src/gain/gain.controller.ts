import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GainService } from './gain.service';
import { CreateGainDto } from './dto/create-gain.dto';
import { UpdateGainDto } from './dto/update-gain.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('gain')
@ApiTags('gain')
export class GainController {
  constructor(private readonly gainService: GainService) {}

  @Post()
  create(@Body() createGainDto: CreateGainDto) {
    return this.gainService.create(createGainDto);
  }

  @Get()
  findAll() {
    return this.gainService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gainService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGainDto: UpdateGainDto) {
  //   return this.gainService.update(+id, updateGainDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gainService.remove(+id);
  }
}
