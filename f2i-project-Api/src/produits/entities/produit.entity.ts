import { Ticket } from 'src/tickets/entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Produit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomDeProduit: string;

  @Column()
  prix: number;

  @Column()
  discription: string;

  @Column()
  stock: number;

  @ManyToMany(() => Ticket, (ticket) => ticket.produits)
  tickets: Ticket[];

  @ManyToOne(() => User, (user) => user.produits)
  user: User;
}
