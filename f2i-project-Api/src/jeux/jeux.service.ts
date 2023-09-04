import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateJeuxDto } from './dto/create-jeux.dto';
import { UpdateJeuxDto } from './dto/update-jeux.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Jeux } from './entities/jeux.entity';
import { EntityManager, LessThan, Repository } from 'typeorm';
import { JeuxDetails } from 'src/jeux-details/entities/jeux-details.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@Injectable()
export class JeuxService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Jeux) private jeuxRepository: Repository<Jeux>,
    @InjectRepository(JeuxDetails)
    private jeuxDetailsRepository: Repository<JeuxDetails>,
  ) {}
  async create(createJeuxDto: CreateJeuxDto, user: User) {
    const { nombreDeTicketTotal } = createJeuxDto;
    let nombreticketDetails = 0;
    const newJeux = this.jeuxRepository.create(createJeuxDto);
    newJeux.user = user;

    const jeuxDetailsEntities = createJeuxDto.jeuxDetails.map((detailsDto) => {
      const jeuxDetails = new JeuxDetails();

      jeuxDetails.nomPrix = detailsDto.nomPrix;
      jeuxDetails.typePrix = detailsDto.typePrix;
      jeuxDetails.valeurPrix = detailsDto.valeurPrix;
      jeuxDetails.nombreTicket = detailsDto.nombreTicket;
      nombreticketDetails += detailsDto.nombreTicket;
      return jeuxDetails;
      // }
    });

    newJeux.jeuxDetails = jeuxDetailsEntities;

    if (nombreticketDetails === nombreDeTicketTotal) {
      await this.jeuxRepository.save(newJeux);
      return newJeux;
    }
    throw new UnauthorizedException(
      'you are not allowed to create this instance please check the nombreDeTicketTotal and nombreTicket',
    );
  }

  async findAll(user: User) {
    const query = await this.jeuxRepository.createQueryBuilder('jeux');

    query.leftJoinAndSelect('jeux.jeuxDetails', 'jeuxDetails');

    query.where(`jeux.user = :user`, { user: user.id });
    try {
      return await query.getMany();
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number, user: User) {
    const query = this.jeuxRepository.createQueryBuilder('jeux');

    query.leftJoinAndSelect('jeux.jeuxDetails', 'jeuxDetails');

    query.where('jeux.id = :id', { id });
    query.andWhere('jeux.user = :userId', { userId: user.id });

    const jeux = await query.getOne();
    if (!jeux) {
      throw new NotFoundException(`Jeux with ID #${id} not found`);
    }
    return jeux;
  }

  async update(id: number, updateJeuxDto: UpdateJeuxDto, user: User) {
    const updatedJeux = await this.findOne(id, user);

    if (!updatedJeux) {
      throw new NotFoundException(`Jeux with ID #${id} not found`);
    }

    this.entityManager.merge(Jeux, updatedJeux, updateJeuxDto);

    return this.entityManager.save(updatedJeux);
  }

  async remove(id: number, user: User) {
    const jeux = await this.findOne(id, user);

    if (!jeux) {
      throw new NotFoundException(`Jeux with ID #${id} not found`);
    }

    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        for (const jeuxDetails of jeux.jeuxDetails) {
          await transactionalEntityManager.delete(JeuxDetails, jeuxDetails.id);
        }

        await transactionalEntityManager.delete(Jeux, jeux.id);
      },
    );
  }

  async tirage(user: User): Promise<Ticket> {
    // Get current date
    const currentDate = new Date();

    // Find the expired jeuxDetails
    const expiredJeuxDetails = await this.jeuxDetailsRepository
      .createQueryBuilder('jeuxDetails')
      .leftJoin('jeuxDetails.jeux', 'jeux')
      .where('jeux.dateFin < :currentDate', { currentDate })
      .getMany();

    if (expiredJeuxDetails.length === 0) {
      throw new NotFoundException('No expired jeuxDetails found.');
    }

    // Find tickets with the selected jeuxDetails for the given user
    const tickets = await this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoin('ticket.jeuxDetails', 'jeuxDetails')
      .leftJoin('ticket.user', 'user')
      .where('jeuxDetails IN (:...jeuxDetails)', {
        jeuxDetails: expiredJeuxDetails,
      })
      .andWhere('user.id = :userId', { userId: user.id })
      .getMany();

    if (tickets.length === 0) {
      throw new NotFoundException(
        'No tickets found for the expired jeuxDetails.',
      );
    }

    // Randomly select one ticket
    const selectedTicket = tickets[Math.floor(Math.random() * tickets.length)];

    return selectedTicket;
  }
}
