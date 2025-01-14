import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { TicketPriority } from './dtos/ticket-create-airline.dto';
import { Message } from 'src/chat/message.schema';
import { UserEntity } from 'src/user/user.schema';

enum TicketStatus {
  INPROGRESS = 'inprogress',
  CLOSED = 'closed',
  RESOLVED = 'RESOLVED',
  OPEN = 'open',
}

registerEnumType(TicketPriority, {
  name: 'TicketPrioritys',
});

@ObjectType('tickets')
@Entity('tickets')
export class Ticket {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

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

  @Field({ nullable: true })
  @Column({ nullable: true })
  typeOfModification?: string;

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

  @Field({
    nullable: true,
  })
  @Column({ nullable: true })
  period?: string;

  @Field({
    nullable: true,
  })
  @Column({ nullable: true })
  invoiceNumber?: string;

  @Field({
    nullable: true,
  })
  @Column({ nullable: true })
  amount?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  origin?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  destination?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  stayDuration?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  excursion?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  arrangement?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  options?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  transfer?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  numberOfRooms?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hotels?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  numberOfPassengers?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  roomType?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  endDate?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  supplement?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  numberOfAdults?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  numberOfChildren?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  numberOfBabies?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  userId?: string;

  @Field(() => UserEntity, {
    nullable: true,
  })
  @ManyToOne(() => UserEntity, (user) => user.tickets)
  user: UserEntity; //WHO OWN TICKET

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.ticket)
  messages: Message[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}

@ObjectType('passengers')
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
