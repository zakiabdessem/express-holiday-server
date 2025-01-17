import {
  Controller,
  Post,
  Body,
  Req,
  HttpStatus,
  Res,
  Get,
  UseFilters,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './message.service';
import { SendMessageDto } from './dtos/send-message.dto';
import { CurrentUser } from 'src/decorator/user.entity';
import { Response } from 'express';
import { UserEntity } from 'src/user/user.schema';
import { ErrorExceptionFilter } from 'src/filter/auth-exception.filter';
import { QueryFailedError } from 'typeorm';
import { UserRole } from 'src/decorator/role.entity';
import { GQLRolesGuard } from 'src/guard/gql-role.guard';
import { Roles } from 'src/decorator/roles.decorator';

@Controller('chat')
@UseFilters(new ErrorExceptionFilter())
export class ChatController {
  private readonly logger = new Logger(ChatController.name);

  constructor(private readonly chatService: ChatService) {}

  @Post('client/send')
  async sendMessage(
    @Body() sendMessageDto: SendMessageDto,
    @CurrentUser() user: UserEntity,
    @Res() res: Response,
  ) {
    try {
      // Validate the request body
      if (!sendMessageDto.ticketId || !sendMessageDto.message) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Ticket ID and message are required.',
        });
      }

      await this.chatService.sendMessageClient(sendMessageDto, user.id);

      return res.status(HttpStatus.OK).json({
        message: 'Message created successfully',
      });
    } catch (error) {
      this.logger.error('Error in sendMessage', error.stack);

      if (error instanceof QueryFailedError) {
        return res.status(HttpStatus.BAD_GATEWAY).json({
          statusCode: HttpStatus.BAD_GATEWAY,
          message: 'Database connection error: ' + error.message,
        });
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Internal server error',
        });
      }
    }
  }

  @Post('messages')
  async getMessage(
    @Body() body: { ticketId: number },
    @CurrentUser() user: UserEntity,
    @Res() res: Response,
  ) {
    try {
      // Validate the request body
      if (!body.ticketId) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Ticket ID is required.',
        });
      }

      const messages = await this.chatService.getMessages(body.ticketId, user);

      // Check if messages were found
      if (!messages || messages.length === 0) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No messages found for the specified ticket.',
        });
      }

      return res.status(HttpStatus.OK).json({
        message: 'Messages retrieved successfully',
        data: messages,
      });
    } catch (error) {
      this.logger.error('Error in getMessage', error.stack);

      if (error instanceof QueryFailedError) {
        return res.status(HttpStatus.BAD_GATEWAY).json({
          statusCode: HttpStatus.BAD_GATEWAY,
          message: 'Database connection error: ' + error.message,
        });
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Internal server error',
        });
      }
    }
  }

  @Post('admin/send')
  @Roles(UserRole.ADMIN, UserRole.SUPERAGENT)
  @UseGuards(GQLRolesGuard)
  async adminSendMessage(
    @Body() sendMessageDto: SendMessageDto,
    @CurrentUser() user: UserEntity,
    @Res() res: Response,
  ) {
    try {
      // Validate the request body
      if (!sendMessageDto.ticketId || !sendMessageDto.message) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Ticket ID and message are required.',
        });
      }

      // Ensure the user has the ADMIN or SUPERAGENT role
      if (user.role !== UserRole.ADMIN && user.role !== UserRole.SUPERAGENT) {
        return res.status(HttpStatus.FORBIDDEN).json({
          statusCode: HttpStatus.FORBIDDEN,
          message: 'You do not have permission to perform this action.',
        });
      }

      await this.chatService.sendMessageAdmin(sendMessageDto, user.id);

      return res.status(HttpStatus.OK).json({
        message: 'Message sent successfully',
      });
    } catch (error) {
      this.logger.error('Error in adminSendMessage', error.stack);

      if (error instanceof QueryFailedError) {
        return res.status(HttpStatus.BAD_GATEWAY).json({
          statusCode: HttpStatus.BAD_GATEWAY,
          message: 'Database connection error: ' + error.message,
        });
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Internal server error',
        });
      }
    }
  }
}
