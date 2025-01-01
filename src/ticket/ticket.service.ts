import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Ticket } from './ticket.schema';
import {
  TicketBillet1CreateDto,
  TicketBillet3CreateDto,
  TicketBillet4CreateDto,
  TicketBillet5CreateDto,
  TicketBillet6CreateDto,
} from './dtos/ticket-create-airline.dto';
import {
  TicketHotel1CreateDto,
  TicketHotel2CreateDto,
  TicketHotel3CreateDto,
  TicketHotel4CreateDto,
  TicketHotel5CreateDto,
  TicketHotel6CreateDto,
} from './dtos/ticket-create-hotel.dto';
import {
  TicketFinance1Dto,
  TicketFinance2Dto,
  TicketFinance3Dto,
} from './dtos/ticket-create-finance.dto';
import {
  TicketSales1Dto,
  TicketSales2Dto,
  TicketSales3Dto,
  TicketSales4Dto,
} from './dtos/ticket-create-sales.dto';
import { TicketTravelDetailsDto } from './dtos/ticket-create-travel.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  // Implement the methods using TypeORM
  async createTicketBillet1Client(
    createTicketDto: TicketBillet1CreateDto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );

    return await this.ticketRepository.save(ticket);
  }

  async createTicketBillet2Client(
    createTicketDto: TicketBillet1CreateDto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );

    return await this.ticketRepository.save(ticket);
  }

  async createTicketBillet3Client(
    createTicketDto: TicketBillet3CreateDto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );

    return await this.ticketRepository.save(ticket);
  }

  async createTicketBillet4Client(
    createTicketDto: TicketBillet4CreateDto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
    } as DeepPartial<Ticket>);

    return await this.ticketRepository.save(ticket);
  }

  async createTicketBillet5Client(
    createTicketDto: TicketBillet5CreateDto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );

    return await this.ticketRepository.save(ticket);
  }

  async createTicketBillet6Client(
    createTicketDto: TicketBillet6CreateDto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );

    return await this.ticketRepository.save(ticket);
  }

  async createTicketHotel1Client(
    createTicketDto: TicketHotel1CreateDto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );

    return await this.ticketRepository.save(ticket);
  }

  async createTicketHotel2Client(
    createTicketDto: TicketHotel2CreateDto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );

    return await this.ticketRepository.save(ticket);
  }

  async createTicketHotel3Client(
    createTicketDto: TicketHotel3CreateDto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );

    return await this.ticketRepository.save(ticket);
  }

  async createTicketHotel4Client(
    createTicketDto: TicketHotel4CreateDto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );

    return await this.ticketRepository.save(ticket);
  }

  async createTicketHotel5Client(
    createTicketDto: TicketHotel5CreateDto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );

    return await this.ticketRepository.save(ticket);
  }

  async createTicketHotel6Client(
    createTicketDto: TicketHotel6CreateDto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );

    return await this.ticketRepository.save(ticket);
  }

  async createTicketFinance1Client(
    createTicketDto: TicketFinance1Dto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );

    return await this.ticketRepository.save(ticket);
  }

  async createTicketFinance2Client(
    createTicketDto: TicketFinance2Dto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );

    return await this.ticketRepository.save(ticket);
  }

  async createTicketFinance3Client(
    createTicketDto: TicketFinance3Dto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );

    return await this.ticketRepository.save(ticket);
  }

  async createTicketSales1Client(
    createTicketDto: TicketSales1Dto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );

    return await this.ticketRepository.save(ticket);
  }

  async createTicketSales2Client(
    createTicketDto: TicketSales2Dto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );

    return await this.ticketRepository.save(ticket);
  }

  async createTicketSales3Client(
    createTicketDto: TicketSales3Dto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );

    return await this.ticketRepository.save(ticket);
  }

  async createTicketSales4Client(
    createTicketDto: TicketSales4Dto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );

    return await this.ticketRepository.save(ticket);
  }

  async createTicketTravel1Client(
    createTicketDto: TicketTravelDetailsDto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );

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
