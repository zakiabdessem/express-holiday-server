// src/chat/chat.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SendMessageDto } from './dtos/send-message.dto';
import { Message } from './message.schema';
import { Ticket } from 'src/ticket/ticket.schema';
import * as sanitizeHtml from 'sanitize-html';
import { UserEntity } from 'src/user/user.schema';
import { UserRole } from 'src/decorator/role.entity';
import { TicketStatus } from 'src/ticket/dtos/ticket-create-airline.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  // Send a message for a specific ticket
  async sendMessageClient(sendMessageDto: SendMessageDto, userId: string) {
    const ticket = await this.ticketRepository.findOne({
      where: { id: sendMessageDto.ticketId },
    });

    if (!ticket) {
      throw new HttpException(
        {
          message: 'Ticket not found.',
          customCode: 'TICKET_NOT_FOUND',
        },
        403,
      );
    }

    if (
      ticket.status === TicketStatus.CLOSED ||
      ticket.status === TicketStatus.RESOLVED
    ) {
      throw new HttpException(
        {
          message: 'Cannot send messages to a closed or resolved ticket.',
          customCode: 'TICKET_CLOSED',
        },
        403,
      );
    }

    if (!ticket || ticket?.userId !== userId) {
      throw new HttpException(
        {
          message: 'No ticket found for the user.',
          customCode: 'TICKET_MISSING',
        },
        403,
      );
    }

    await this.messageRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const message = transactionalEntityManager.create(Message, {
          senderId: userId,
          message: sanitizeHtml(sendMessageDto.message),
          ticketId: sendMessageDto.ticketId,
        });
        await transactionalEntityManager.save(Message, message);
      },
    );
  }

  // Send a message for a specific ticket (admin/superagent)
  async sendMessageAdmin(sendMessageDto: SendMessageDto, userId: string) {
    const ticket = await this.ticketRepository.findOne({
      where: { id: sendMessageDto.ticketId },
    });

    // Check if the ticket exists
    if (!ticket) {
      throw new HttpException(
        {
          message: 'Ticket not found.',
          customCode: 'TICKET_NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // Check if the ticket is closed or resolved
    if (
      ticket.status === TicketStatus.CLOSED ||
      ticket.status === TicketStatus.RESOLVED
    ) {
      throw new HttpException(
        {
          message: 'Cannot send messages to a closed or resolved ticket.',
          customCode: 'TICKET_CLOSED',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    // Save the message in a transaction
    await this.messageRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const message = transactionalEntityManager.create(Message, {
          senderId: userId,
          message: sanitizeHtml(sendMessageDto.message),
          ticketId: sendMessageDto.ticketId,
        });
        await transactionalEntityManager.save(Message, message);
      },
    );

    if (ticket.status == TicketStatus.INPROGRESS) return;

    ticket.status = TicketStatus.INPROGRESS;

    await this.ticketRepository.save(ticket);
  }

  // Get messages for a specific ticket
  async getMessages(ticketId: number, user: UserEntity) {
    const ticket = await this.ticketRepository.findOne({
      where: { id: ticketId },
      relations: ['messages', 'messages.sender'], // Include the sender relation
      select: {
        messages: {
          id: true,
          senderId: true,
          message: true,
          ticketId: true,
          createdAt: true,
          updatedAt: true,
          sender: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
            profilePicture: true,
            contactNumber: true,
            role: true,
          },
        },
      },
    });

    if (!ticket) {
      return [];
    }

    // Check user permissions
    if (user?.role === UserRole.ADMIN || user?.role === UserRole.SUPERAGENT) {
      return ticket.messages || [];
    }

    if (user?.role === UserRole.CLIENT && user?.id === ticket.userId) {
      return ticket.messages || [];
    }

    return [];
  }
}
