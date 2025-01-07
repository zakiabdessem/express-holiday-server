import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './message.service';
import { ChatController } from './message.controller';
import { Message } from './message.schema';
import { Ticket } from 'src/ticket/ticket.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Ticket])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
