import { ApiProperty } from '@nestjs/swagger';
import { Jeux } from 'src/jeux/entities/jeux.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class JeuxDetails {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  nomPrix: string;

  @Column()
  @ApiProperty()
  typePrix: string;

  @Column()
  @ApiProperty()
  valeurPrix: number;

  @Column()
  @ApiProperty()
  nombreTicket: number;

  @ManyToOne(() => Jeux, (jeux) => jeux.jeuxDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  jeux: Jeux;

  @OneToMany(() => Ticket, (ticket) => ticket.jeuxDetails, { cascade: true })
  tickets: Ticket[];
}
