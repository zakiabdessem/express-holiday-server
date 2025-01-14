import {
  Controller,
  Post,
  Body,
  Req,
  HttpStatus,
  Res,
  Get,
  UseFilters,
} from '@nestjs/common';
import { ChatService } from './message.service';
import { SendMessageDto } from './dtos/send-message.dto';
import { CurrentUser } from 'src/decorator/user.entity';
import { Response } from 'express';
import { UserEntity } from 'src/user/user.schema';
import { ErrorExceptionFilter } from 'src/filter/auth-exception.filter';

@Controller('chat')
@UseFilters(new ErrorExceptionFilter())
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('client/send')
  async sendMessage(
    @Body() sendMessageDto: SendMessageDto,
    @CurrentUser() user: UserEntity,
    @Res() res: Response,
  ) {
    // ): Promise<MessageResponseDto> {

    try {
      await this.chatService.sendMessageClient(sendMessageDto, user.id);

      return res.status(HttpStatus.OK).json({
        message: 'Message created successfully',
      });
    } catch (error) {
      console.log("🚀 ~ error:", error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
    }

    // return this.chatService.sendMessageClient(sendMessageDto);
  }

  @Post('client/messages')
  async getMessage(
    @Body()
    body: {
      ticketId: number;
    },
    @CurrentUser() user: UserEntity,
    @Res() res: Response,
  ) {
    // ): Promise<MessageResponseDto> {

    try {
      await this.chatService.getMessages(body.ticketId);

      return res.status(HttpStatus.OK).json({
        message: 'Message created successfully',
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
    }

    // return this.chatService.sendMessageClient(sendMessageDto);
  }

  //   @Get('messages/:senderId/:receiverId')
  //   async getMessages(
  //     @Param('senderId', ParseUUIDPipe) senderId: string,
  //     @Param('receiverId', ParseUUIDPipe) receiverId: string,
  //   ): Promise<MessageResponseDto[]> {
  //     return this.chatService.getMessages(senderId, receiverId);
  //   }
}
