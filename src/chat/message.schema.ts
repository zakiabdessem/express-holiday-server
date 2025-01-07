import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Ticket } from 'src/ticket/ticket.schema'; // Regular import
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
  @Field(() => ID) // Ensure this decorator is present
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field() // Ensure this decorator is present
  @Column()
  senderId: string;

  @Field() // Ensure this decorator is present
  @Column()
  message: string;

  @Field() // Ensure this decorator is present
  @Column()
  ticketId: number;

  @Field(() => Date) // Ensure this decorator is present
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date) // Ensure this decorator is present
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Ticket) // Use a function to resolve the type
  @ManyToOne(() => Ticket, (ticket) => ticket.messages)
  @JoinColumn({ name: 'ticketId' })
  ticket: Ticket;
}
