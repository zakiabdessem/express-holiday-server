import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Category } from 'src/category/category.schema';
import { Subcategory } from 'src/category/subcategory.schema';
import { TicketPriority } from './dtos/ticket-create-airline.dto';

enum TicketStatus {
  INPROGRESS = 'inprogress',
  CLOSED = 'closed',
  OPEN = 'open',
}

registerEnumType(TicketPriority, {
  name: 'TicketPriority',
});

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
  categoryId: number;

  @Field()
  @Column()
  subcategoryId: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => TicketPriority)
  @Column({
    type: 'enum',
    enum: TicketPriority,
    default: TicketPriority.LOW,
  })
  priority: TicketPriority;

  @Field({ nullable: true })
  @Column({ nullable: true })
  subject?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  refundReason?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  changeReason?: string;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true })
  datesAndItineraries?: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  pnr?: string;

  @Field(() => [Passenger], { nullable: 'itemsAndList' })
  @OneToMany(() => Passenger, (passenger) => passenger.ticket, {
    cascade: true,
  })
  passengers?: Passenger[];

  @Field({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  estimatedTickets?: number;

  @Field({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  officeId?: number;

  @Field({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  voucherNumber?: string;

  @Field({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  reserveNumber?: string;

  @Field({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  typeOfService?: string;

  @Field({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  supplierReservationId?: string;

  @Field({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  departureDate?: string;

  @Field({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  departureLocation?: string;

  @Field({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  arrivalDate?: string;

  @Field({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  oneWayTransfer?: boolean;

  @Field({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  roundTripTransfer?: boolean;

  @Field({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  arrivalLocation?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}

@ObjectType()
@Entity('passengers')
export class Passenger {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  ticketNumber: string; //NOT TICKET OF RELATION

  @Field(() => Ticket)
  @ManyToOne(() => Ticket, (ticket) => ticket.passengers, {
    onDelete: 'CASCADE',
  })
  ticket: Ticket;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
