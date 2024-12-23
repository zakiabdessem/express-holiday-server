import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketCreateDto } from './dtos/ticket-create.dto';
import { Ticket } from './ticket.schema';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  // Implement the methods using TypeORM
  async createTicketClient(createTicketDto: TicketCreateDto): Promise<Ticket> {
    const ticket = this.ticketRepository.create(createTicketDto);
    return await this.ticketRepository.save(ticket);
  }

  async findOne(id: string): Promise<Ticket | null> {
    return this.ticketRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findOneById(id: string): Promise<Ticket | null> {
    return this.ticketRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }

  async findOneByIdAndUpdate(
    id: string,
    toUpdate: Partial<Ticket>,
  ): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: {
        id,
      },
    });
    if (ticket) {
      this.ticketRepository.merge(ticket, toUpdate);
      return this.ticketRepository.save(ticket);
    }
    return null;
  }

  async findAllByQuery(queryText: string): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: [
        { first_name: queryText },
        { last_name: queryText },
        { pnr: queryText },
      ],
    });
  }
}
