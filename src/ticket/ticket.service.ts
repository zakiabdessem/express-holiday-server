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
  TicketStatus,
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

  private async setUserRelationship(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async countTicketsByStatus(): Promise<{ [key: string]: number }> {
    // Define all possible statuses from the TicketStatus enum
    const allStatuses = Object.values(TicketStatus);

    // Initialize the result object with 0 for each status
    const result: { [key: string]: number } = {};
    allStatuses.forEach((status) => {
      result[status] = 0;
    });

    // Query the database for ticket counts by status
    const statusCounts = await this.ticketRepository
      .createQueryBuilder('ticket')
      .select('ticket.status', 'status')
      .addSelect('COUNT(ticket.id)', 'count')
      .groupBy('ticket.status')
      .getRawMany();

    // Update the result object with counts from the database
    statusCounts.forEach((statusCount) => {
      result[statusCount.status] = parseInt(statusCount.count, 10);
    });

    return result;
  }

  async createTicketBillet1Client(
    createTicketDto: TicketBillet1CreateDto & { userId: string },
  ): Promise<Ticket> {
    const user = await this.setUserRelationship(createTicketDto.userId);
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    } as DeepPartial<Ticket>);
    return this.ticketRepository.save(ticket);
  }

  async createTicketBillet2Client(
    createTicketDto: TicketBillet1CreateDto & { userId: string },
  ): Promise<Ticket> {
    const user = await this.setUserRelationship(createTicketDto.userId);
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    } as DeepPartial<Ticket>);
    return this.ticketRepository.save(ticket);
  }

  async createTicketBillet3Client(
    createTicketDto: TicketBillet3CreateDto & { userId: string },
  ): Promise<Ticket> {
    const user = await this.setUserRelationship(createTicketDto.userId);
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    } as DeepPartial<Ticket>);
    return this.ticketRepository.save(ticket);
  }

  async createTicketBillet4Client(
    createTicketDto: TicketBillet4CreateDto & { userId: string },
  ): Promise<Ticket> {
    const user = await this.setUserRelationship(createTicketDto.userId);
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    } as DeepPartial<Ticket>);
    return this.ticketRepository.save(ticket);
  }

  async createTicketBillet5Client(
    createTicketDto: TicketBillet5CreateDto & { userId: string },
  ): Promise<Ticket> {
    const user = await this.setUserRelationship(createTicketDto.userId);
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    } as DeepPartial<Ticket>);
    return this.ticketRepository.save(ticket);
  }

  async createTicketBillet6Client(
    createTicketDto: TicketBillet6CreateDto & { userId: string },
  ): Promise<Ticket> {
    const user = await this.setUserRelationship(createTicketDto.userId);
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    } as DeepPartial<Ticket>);
    return this.ticketRepository.save(ticket);
  }

  async createTicketHotel1Client(
    createTicketDto: TicketHotel1CreateDto & { userId: string },
  ): Promise<Ticket> {
    const user = await this.setUserRelationship(createTicketDto.userId);
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    } as DeepPartial<Ticket>);
    return this.ticketRepository.save(ticket);
  }

  async createTicketHotel2Client(
    createTicketDto: TicketHotel2CreateDto & { userId: string },
  ): Promise<Ticket> {
    const user = await this.setUserRelationship(createTicketDto.userId);
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    } as DeepPartial<Ticket>);
    return this.ticketRepository.save(ticket);
  }

  async createTicketHotel3Client(
    createTicketDto: TicketHotel3CreateDto & { userId: string },
  ): Promise<Ticket> {
    const user = await this.setUserRelationship(createTicketDto.userId);
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    } as DeepPartial<Ticket>);
    return this.ticketRepository.save(ticket);
  }

  async createTicketHotel4Client(
    createTicketDto: TicketHotel4CreateDto & { userId: string },
  ): Promise<Ticket> {
    const user = await this.setUserRelationship(createTicketDto.userId);
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    } as DeepPartial<Ticket>);
    return this.ticketRepository.save(ticket);
  }

  async createTicketHotel5Client(
    createTicketDto: TicketHotel5CreateDto & { userId: string },
  ): Promise<Ticket> {
    const user = await this.setUserRelationship(createTicketDto.userId);
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    } as DeepPartial<Ticket>);
    return this.ticketRepository.save(ticket);
  }

  async createTicketHotel6Client(
    createTicketDto: TicketHotel6CreateDto & { userId: string },
  ): Promise<Ticket> {
    const user = await this.setUserRelationship(createTicketDto.userId);
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    } as DeepPartial<Ticket>);
    return this.ticketRepository.save(ticket);
  }

  async createTicketFinance1Client(
    createTicketDto: TicketFinance1Dto & { userId: string },
  ): Promise<Ticket> {
    const user = await this.setUserRelationship(createTicketDto.userId);
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    } as DeepPartial<Ticket>);
    return this.ticketRepository.save(ticket);
  }

  async createTicketFinance2Client(
    createTicketDto: TicketFinance2Dto & { userId: string },
  ): Promise<Ticket> {
    const user = await this.setUserRelationship(createTicketDto.userId);
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    } as DeepPartial<Ticket>);
    return this.ticketRepository.save(ticket);
  }

  async createTicketFinance3Client(
    createTicketDto: TicketFinance3Dto & { userId: string },
  ): Promise<Ticket> {
    const user = await this.setUserRelationship(createTicketDto.userId);
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    } as DeepPartial<Ticket>);
    return this.ticketRepository.save(ticket);
  }

  async createTicketSales1Client(
    createTicketDto: TicketSales1Dto & { userId: string },
  ): Promise<Ticket> {
    const user = await this.setUserRelationship(createTicketDto.userId);
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    } as DeepPartial<Ticket>);
    return this.ticketRepository.save(ticket);
  }

  async createTicketSales2Client(
    createTicketDto: TicketSales2Dto & { userId: string },
  ): Promise<Ticket> {
    const user = await this.setUserRelationship(createTicketDto.userId);
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    } as DeepPartial<Ticket>);
    return this.ticketRepository.save(ticket);
  }

  async createTicketSales3Client(
    createTicketDto: TicketSales3Dto & { userId: string },
  ): Promise<Ticket> {
    const user = await this.setUserRelationship(createTicketDto.userId);
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    } as DeepPartial<Ticket>);
    return this.ticketRepository.save(ticket);
  }

  async createTicketSales4Client(
    createTicketDto: TicketSales4Dto & { userId: string },
  ): Promise<Ticket> {
    const user = await this.setUserRelationship(createTicketDto.userId);
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    } as DeepPartial<Ticket>);
    return this.ticketRepository.save(ticket);
  }

  async createTicketTravel1Client(
    createTicketDto: TicketTravelDetailsDto & { userId: string },
  ): Promise<Ticket> {
    const user = await this.setUserRelationship(createTicketDto.userId);
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
    } as DeepPartial<Ticket>);
    return this.ticketRepository.save(ticket);
  }

  async findOne(id: number): Promise<Ticket | null> {
    return await this.ticketRepository.findOne({
      relations: ['user'],
      where: {
        id,
      },
    });
  }

  async findOneById(id: number): Promise<Ticket | null> {
    return await this.ticketRepository.findOne({
      relations: ['user'],
      where: {
        id,
      },
    });
  }

  async findAllById(id: string): Promise<Ticket[]> {
    return await this.ticketRepository.find({
      relations: ['user'],
      where: {
        userId: id,
      },
    });
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketRepository.find({ relations: ['user'] });
  }

  async findOneByIdAndUpdate(
    id: number,
    toUpdate: Partial<Ticket>,
  ): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      relations: ['user'],
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

  async findAllByQuery(query: {
    firstName?: string;
    lastName?: string;
    email?: string;
    ticketId?: string; // Use ticketId instead of ticketNumber
  }): Promise<Ticket[]> {
    const queryBuilder = this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.user', 'user');

    // Dynamically add conditions based on provided query parameters
    if (query.firstName) {
      queryBuilder.andWhere('user.first_name LIKE :firstName', {
        firstName: `%${query.firstName}%`,
      });
    }
    if (query.lastName) {
      queryBuilder.andWhere('user.last_name LIKE :lastName', {
        lastName: `%${query.lastName}%`,
      });
    }
    if (query.email) {
      queryBuilder.andWhere('user.email LIKE :email', {
        email: `%${query.email}%`,
      });
    }
    if (query.ticketId) {
      queryBuilder.andWhere('ticket.id = :ticketId', {
        ticketId: query.ticketId, // Use exact match for ID
      });
    }

    return queryBuilder.getMany();
  }
}
