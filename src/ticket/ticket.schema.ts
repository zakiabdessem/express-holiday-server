import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

enum TicketStatus {
  INPROGRESS = 'inprogress',
  CLOSED = 'closed',
  OPEN = 'open',
}

@ObjectType()
@Entity('tickets')
export class Ticket {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp without time zone', nullable: true })
  last_reply?: Date;

  @Field()
  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.OPEN,
  })
  status: TicketStatus;

  @Field()
  @Column()
  category: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  reason?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  pnr?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
