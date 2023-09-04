import { ApiProperty } from '@nestjs/swagger';
import { Jeux } from 'src/jeux/entities/jeux.entity';
import { Produit } from 'src/produits/entities/produit.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column({ nullable: true })
  image?: string;

  @ApiProperty()
  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Ticket, (ticket) => ticket.user, { cascade: true })
  tickets: Ticket[];

  @OneToMany(() => Jeux, (jeux) => jeux.user, { cascade: true })
  jeux: Jeux[];

  @OneToMany(() => Produit, (produit) => produit.user, { cascade: true })
  produits: Produit[];
}
