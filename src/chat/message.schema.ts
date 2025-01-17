import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Ticket } from 'src/ticket/ticket.schema';
import { UserEntity } from 'src/user/user.schema';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@ObjectType('messages')
@Entity('messages')
export class Message {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({
    nullable: true,
  })
  @Column({ nullable: true }) // Ensure senderId is non-nullable
  senderId: string;

  @Field(() => UserEntity, {
    nullable: true,
  })
  @ManyToOne(() => UserEntity, (user) => user.messages, {
    nullable: true,
  })
  @JoinColumn({ name: 'senderId' })
  sender: UserEntity;

  @Field()
  @Column()
  message: string;

  @Field()
  @Column()
  ticketId: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Ticket)
  @ManyToOne(() => Ticket, (ticket) => ticket.messages)
  @JoinColumn({ name: 'ticketId' })
  ticket: Ticket;
}
