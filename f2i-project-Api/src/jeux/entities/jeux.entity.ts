import { ApiProperty } from '@nestjs/swagger';
import { JeuxDetails } from 'src/jeux-details/entities/jeux-details.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Jeux {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  nomJeux: string;

  @CreateDateColumn()
  @ApiProperty()
  dateDebut?: Date;

  @CreateDateColumn()
  @ApiProperty()
  dateFin?: Date;

  @Column()
  @ApiProperty()
  nombreDeTicketTotal: number;

  @Column()
  @ApiProperty()
  description: string;

  @ManyToOne(() => User, (user) => user.jeux)
  user: User;

  @OneToMany(() => JeuxDetails, (jeuxDetails) => jeuxDetails.jeux, {
    cascade: true,
  })
  jeuxDetails: JeuxDetails[];
}
