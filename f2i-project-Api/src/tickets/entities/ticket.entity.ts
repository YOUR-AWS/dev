import { ApiProperty } from '@nestjs/swagger';
import { JeuxDetails } from 'src/jeux-details/entities/jeux-details.entity';
import { Produit } from 'src/produits/entities/produit.entity';
import { User } from 'src/users/entities/user.entity';
import { Gain } from 'src/gain/entities/gain.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numTicket: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateachat: Date;

  @Column()
  montant: number;

  @Column({ default: false })
  etat: boolean;

  @ManyToOne(() => User, (user) => user.tickets)
  user: User;

  @ManyToOne(() => JeuxDetails, (jeuxDetails) => jeuxDetails.tickets)
  jeuxDetails: JeuxDetails;

  @ManyToMany(() => Produit, (produit) => produit.tickets)
  @JoinTable()
  produits: Produit[];

  @ManyToMany(() => Gain, (gain) => gain.tickets)
  @JoinTable()
  gains: Gain[];
}
