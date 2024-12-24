import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Ticket } from './ticket.schema';
import { TicketBillet1CreateDto } from './dtos/ticket-create-airline.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  // Implement the methods using TypeORM
  async createTicketBillet1Client(createTicketDto: TicketBillet1CreateDto): Promise<Ticket> {
    const ticket = this.ticketRepository.create(createTicketDto as DeepPartial<Ticket>);
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

  // async findAllByQuery(queryText: string): Promise<Ticket[]> {
  //   return this.ticketRepository.find({
  //     where: [
  //       { first_name: queryText },
  //       { last_name: queryText },
  //       { pnr: queryText },
  //     ],
  //   });
  // }
}
