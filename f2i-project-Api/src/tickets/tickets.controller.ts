import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/users/decorators/user.decorator';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Ticket } from './entities/ticket.entity';
import { JwtAuthGuard } from 'src/users/guards/auth-guard';

@ApiTags('Ticket')
@Controller('tickets')
@UseGuards(JwtAuthGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiBearerAuth('jwt')
  create(@Body() createTicketDto: CreateTicketDto, @CurrentUser() user: User) {
    console.log(user);

    return this.ticketsService.create(createTicketDto, user);
  }

  @Get()
  @ApiBearerAuth('jwt')
  @ApiOkResponse({ type: Ticket, isArray: true })
  findAll(@CurrentUser() user: User) {
    return this.ticketsService.findAll(user);
  }

  @Get(':numticket')
  @ApiBearerAuth('jwt')
  @ApiOkResponse({ type: Ticket, description: 'Get a Ticket with its number' })
  findOneByNum(
    @Param('numticket') numticket: string,
    @CurrentUser() user: User,
  ) {
    return this.ticketsService.findOneByNumTicket(numticket, user);
  }

  @Get('id/:id')
  @ApiBearerAuth('jwt')
  @ApiOkResponse({ type: Ticket, description: 'Get a Ticket with id' })
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.ticketsService.findOne(+id, user);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ticketsService.remove(+id);
  // }
}
