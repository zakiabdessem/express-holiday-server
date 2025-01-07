// src/chat/entities/message.entity.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Ticket } from 'src/ticket/ticket.schema';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@ObjectType()
@Entity('messages')
export class Message {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  senderId: string;

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
