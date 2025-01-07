import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Ticket } from './ticket.schema';
import { UserEntity } from 'src/user/user.schema';
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
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createTicketBillet1Client(
    createTicketDto: TicketBillet1CreateDto,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );
    const savedTicket = await this.ticketRepository.save(ticket);
    return savedTicket;
  }

  async createTicketBillet2Client(
    createTicketDto: TicketBillet1CreateDto & { user: string },
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );
    const savedTicket = await this.ticketRepository.save(ticket);
    return savedTicket;
  }

  async createTicketBillet3Client(
    createTicketDto: TicketBillet3CreateDto & { user: string },
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );
    const savedTicket = await this.ticketRepository.save(ticket);

    return savedTicket;
  }

  async createTicketBillet4Client(
    createTicketDto: TicketBillet4CreateDto & { user: string },
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
    } as DeepPartial<Ticket>);
    const savedTicket = await this.ticketRepository.save(ticket);

    return savedTicket;
  }

  async createTicketBillet5Client(
    createTicketDto: TicketBillet5CreateDto & { user: string },
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );
    const savedTicket = await this.ticketRepository.save(ticket);

    return savedTicket;
  }

  async createTicketBillet6Client(
    createTicketDto: TicketBillet6CreateDto & { user: string },
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );
    const savedTicket = await this.ticketRepository.save(ticket);

    return savedTicket;
  }

  async createTicketHotel1Client(
    createTicketDto: TicketHotel1CreateDto & { user: string },
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );
    const savedTicket = await this.ticketRepository.save(ticket);

    return savedTicket;
  }

  async createTicketHotel2Client(
    createTicketDto: TicketHotel2CreateDto & { user: string },
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );
    const savedTicket = await this.ticketRepository.save(ticket);

    return savedTicket;
  }

  async createTicketHotel3Client(
    createTicketDto: TicketHotel3CreateDto & { user: string },
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );
    const savedTicket = await this.ticketRepository.save(ticket);

    return savedTicket;
  }

  async createTicketHotel4Client(
    createTicketDto: TicketHotel4CreateDto & { user: string },
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );
    const savedTicket = await this.ticketRepository.save(ticket);

    return savedTicket;
  }

  async createTicketHotel5Client(
    createTicketDto: TicketHotel5CreateDto & { user: string },
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );
    const savedTicket = await this.ticketRepository.save(ticket);

    return savedTicket;
  }

  async createTicketHotel6Client(
    createTicketDto: TicketHotel6CreateDto & { user: string },
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );
    const savedTicket = await this.ticketRepository.save(ticket);

    return savedTicket;
  }

  async createTicketFinance1Client(
    createTicketDto: TicketFinance1Dto & { user: string },
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );
    const savedTicket = await this.ticketRepository.save(ticket);

    return savedTicket;
  }

  async createTicketFinance2Client(
    createTicketDto: TicketFinance2Dto & { user: string },
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );
    const savedTicket = await this.ticketRepository.save(ticket);

    return savedTicket;
  }

  async createTicketFinance3Client(
    createTicketDto: TicketFinance3Dto & { user: string },
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );
    const savedTicket = await this.ticketRepository.save(ticket);

    return savedTicket;
  }

  async createTicketSales1Client(
    createTicketDto: TicketSales1Dto & { user: string },
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );
    const savedTicket = await this.ticketRepository.save(ticket);

    return savedTicket;
  }

  async createTicketSales2Client(
    createTicketDto: TicketSales2Dto & { user: string },
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );
    const savedTicket = await this.ticketRepository.save(ticket);

    return savedTicket;
  }

  async createTicketSales3Client(
    createTicketDto: TicketSales3Dto & { user: string },
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );
    const savedTicket = await this.ticketRepository.save(ticket);

    return savedTicket;
  }

  async createTicketSales4Client(
    createTicketDto: TicketSales4Dto & { user: string },
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );
    const savedTicket = await this.ticketRepository.save(ticket);

    return savedTicket;
  }

  async createTicketTravel1Client(
    createTicketDto: TicketTravelDetailsDto & { user: string },
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create(
      createTicketDto as DeepPartial<Ticket>,
    );
    const savedTicket = await this.ticketRepository.save(ticket);

    return savedTicket;
  }

  async findOne(id: number): Promise<Ticket | null> {
    return this.ticketRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findOneById(id: number): Promise<Ticket | null> {
    return this.ticketRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find({ relations: ['user'] });
  }

  async findOneByIdAndUpdate(
    id: number,
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
}
