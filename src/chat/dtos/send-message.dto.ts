// src/chat/dto/send-message.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty()
  @IsNumber()
  ticketId: number;

  @IsNotEmpty()
  @IsString()
  message: string;
}
