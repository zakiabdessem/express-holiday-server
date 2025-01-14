// src/chat/chat.service.ts
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SendMessageDto } from './dtos/send-message.dto';
import { Message } from './message.schema';
import { Ticket } from 'src/ticket/ticket.schema';
import { TicketStatus } from 'src/ticket/dtos/ticket-create-airline.dto';
import * as sanitizeHtml from 'sanitize-html';

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

    if (
      !ticket
    ) {
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

  //   // Send a message for a specific ticket
  //   async sendMessageAdmin(
  //     sendMessageDto: SendMessageDto,
  //   ): Promise<MessageResponseDto> {
  //     const message = this.chatMessageRepository.create(sendMessageDto);
  //     const savedMessage = await this.chatMessageRepository.save(message);
  //     return {
  //       id: savedMessage.id,
  //       senderId: savedMessage.senderId,
  //       message: savedMessage.message,
  //       createdAt: savedMessage.createdAt,
  //     };

  //   }

  // Get messages for a specific ticket
  async getMessages(ticketId: number) {
    const ticket = await this.ticketRepository.findOne({
      where: { id: ticketId },
      relations: ['messages'],
    });
    console.log('🚀 ~ ChatService ~ getMessages ~ ticket:', ticket.messages);

    return ticket.messages;
  }
}
