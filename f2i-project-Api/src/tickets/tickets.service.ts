import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { In, MoreThan, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Jeux } from 'src/jeux/entities/jeux.entity';
import { Produit } from 'src/produits/entities/produit.entity';
import { Gain } from 'src/gain/entities/gain.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
    @InjectRepository(Jeux) private jeuxRepository: Repository<Jeux>,
    @InjectRepository(Produit) private produitRepository: Repository<Produit>,
    @InjectRepository(Gain) private gainRepository: Repository<Gain>,
  ) {}

  async create(createTicketDto: CreateTicketDto, user: User) {
    const { montant, produitIds } = createTicketDto;
    const newTicket = this.ticketRepository.create(createTicketDto);

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let ticketNumber = '';

    for (let i = 0; i < 15; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      ticketNumber += characters.charAt(randomIndex);
    }

    newTicket.user = user;
    newTicket.numTicket = ticketNumber;

    const produits = await this.produitRepository.find({
      where: { id: In(produitIds) },
    });

    // Assign the fetched produits to the new ticket
    newTicket.produits = produits;

    if (montant && montant >= 49) {
      // Find the active Jeux and JeuxDetails with an open dateFin
      const activeJeux = await this.jeuxRepository.findOne({
        where: {
          dateFin: MoreThan(new Date()),
        },
        relations: ['jeuxDetails'], // Include the JeuxDetails relationship
      });

      if (activeJeux && activeJeux.jeuxDetails.length > 0) {
        const eligibleJeuxDetails = activeJeux.jeuxDetails.filter(
          async (jeuxDetails) => {
            // Count the number of existing tickets associated with this JeuxDetails
            const ticketCount = await this.ticketRepository.count({
              where: {
                jeuxDetails: jeuxDetails,
              },
            });

            return ticketCount < jeuxDetails.nombreTicket;
          },
        );

        if (eligibleJeuxDetails.length === 0) {
          throw new BadRequestException(
            'No eligible JeuxDetails with available tickets.',
          );
        }

        // Pick a random eligible JeuxDetails
        const randomIndex = Math.floor(
          Math.random() * eligibleJeuxDetails.length,
        );
        const selectedJeuxDetails = eligibleJeuxDetails[randomIndex];

        // Check if the selected JeuxDetails has already reached the maximum allowed tickets
        const selectedJeuxDetailsTicketCount =
          await this.ticketRepository.count({
            where: {
              jeuxDetails: selectedJeuxDetails,
            },
          });

        if (
          selectedJeuxDetailsTicketCount >= selectedJeuxDetails.nombreTicket
        ) {
          return this.ticketRepository.save(newTicket);
        }

        // Set the selected JeuxDetails for the new Ticket
        newTicket.jeuxDetails = selectedJeuxDetails;

        // Set the etat to true as the ticket is participating in JeuxDetails
        newTicket.etat = true;

        const gain = new Gain();
        const newDate = new Date(activeJeux.dateFin);
        newDate.setMonth(newDate.getMonth() + 1);

        gain.dateLimiteDeRecuperation = newDate;
        await this.gainRepository.save(gain);

        newTicket.gains = [gain];
      }
    }

    return this.ticketRepository.save(newTicket);
  }

  async findAll(user: User) {
    try {
      const tickets = await this.ticketRepository
        .createQueryBuilder('ticket')
        .leftJoinAndSelect('ticket.jeuxDetails', 'jeuxDetails')
        .leftJoinAndSelect('jeuxDetails.jeux', 'jeux')
        .leftJoinAndMapMany('ticket.produits', 'ticket.produits', 'produit')
        .leftJoinAndSelect('ticket.user', 'user')
        .where('user.id = :userId', { userId: user.id })
        .getMany();

      return tickets;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number, user: User) {
    const ticket = await this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.jeuxDetails', 'jeuxDetails')
      .leftJoinAndSelect('jeuxDetails.jeux', 'jeux')
      .leftJoinAndMapMany('ticket.produits', 'ticket.produits', 'produit')
      .leftJoinAndSelect('ticket.user', 'user')
      .where('ticket.id = :id', { id })
      .andWhere('user.id = :userId', { userId: user.id })
      .getOne();

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID #${id} not found`);
    }
    return ticket;
  }

  async findOneByNumTicket(numTicket: string, user: User): Promise<Ticket> {
    const ticket = await this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.jeuxDetails', 'jeuxDetails')
      .leftJoinAndSelect('jeuxDetails.jeux', 'jeux')
      .leftJoinAndMapMany('ticket.produits', 'ticket.produits', 'produit')
      .leftJoinAndSelect('ticket.user', 'user')
      .where('ticket.numTicket = :numTicket', { numTicket })
      .andWhere('user.id = :userId', { userId: user.id })
      .getOne();

    if (!ticket) {
      throw new NotFoundException(`Ticket with number ${numTicket} not found`);
    }
    return ticket;
  }
}
