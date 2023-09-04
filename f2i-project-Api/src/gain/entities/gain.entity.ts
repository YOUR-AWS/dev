import { Ticket } from 'src/tickets/entities/ticket.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  dateDeRecuperation: Date;

  @Column()
  dateLimiteDeRecuperation: Date;

  @ManyToMany(() => Ticket, (ticket) => ticket.gains)
  tickets: Ticket[];
}
