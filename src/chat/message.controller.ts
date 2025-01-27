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
  NotFoundException,
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
  @Roles(UserRole.CLIENT)
  @UseGuards(GQLRolesGuard)
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
  @Roles(
    UserRole.CLIENT,
    UserRole.ADMIN,
    UserRole.SUPERAGENT,
    UserRole.AGENT_AIRLINE,
    UserRole.AGENT_FINANCE,
    UserRole.AGENT_HOTEL,
    UserRole.AGENT_SALES,
    UserRole.AGENT_TRAVEL,
    UserRole.AGENT_MARITIME,
    UserRole.AGENT_TECHNICAL,
    UserRole.AGENT_VISA,
  )
  @UseGuards(GQLRolesGuard)
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

      let messages;

      if (
        user.role === UserRole.CLIENT ||
        user.role === UserRole.ADMIN ||
        user.role === UserRole.SUPERAGENT
      ) {
        messages = await this.chatService.getMessages(body.ticketId, user);
      } else {
        const roleToCategoryMap = {
          [UserRole.AGENT_AIRLINE]: 1, // Service Billetterie aerienne
          [UserRole.AGENT_HOTEL]: 2, // Service hôtellerie
          [UserRole.AGENT_FINANCE]: 3, // Service Finance
          [UserRole.AGENT_SALES]: 4, // Service Commercial -- Sales departement
          [UserRole.AGENT_TRAVEL]: 5, // Service Omra & Voyages Organises
          [UserRole.AGENT_MARITIME]: 6, // Billetterie Martitime
          [UserRole.AGENT_TECHNICAL]: 7, // Service technique
          [UserRole.AGENT_VISA]: 8, // Service visa
        };

        // Get the category ID based on the user's role
        const categoryId = roleToCategoryMap[user.role];

        if (!categoryId) {
          throw new NotFoundException('No category found for the user role');
        }

        messages = await this.chatService.getMessagesAgent(
          body.ticketId,
          user,
          categoryId,
        );
      }

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

  @Post('agent/send')
  @Roles(
    UserRole.ADMIN,
    UserRole.SUPERAGENT,
    UserRole.AGENT_AIRLINE,
    UserRole.AGENT_FINANCE,
    UserRole.AGENT_HOTEL,
    UserRole.AGENT_SALES,
    UserRole.AGENT_TRAVEL,
    UserRole.AGENT_MARITIME,
    UserRole.AGENT_TECHNICAL,
    UserRole.AGENT_VISA,
  )
  @UseGuards(GQLRolesGuard)
  async agentSendMessage(
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

      if (user.role === UserRole.ADMIN || user.role === UserRole.SUPERAGENT) {
        return this.chatService.sendMessageAdmin(sendMessageDto, user.id);
      }

      const roleToCategoryMap = {
        [UserRole.AGENT_AIRLINE]: 1, // Service Billetterie aerienne
        [UserRole.AGENT_HOTEL]: 2, // Service hôtellerie
        [UserRole.AGENT_FINANCE]: 3, // Service Finance
        [UserRole.AGENT_SALES]: 4, // Service Commercial -- Sales departement
        [UserRole.AGENT_TRAVEL]: 5, // Service Omra & Voyages Organises
        [UserRole.AGENT_MARITIME]: 6, // Billetterie Martitime
        [UserRole.AGENT_TECHNICAL]: 7, // Service technique
        [UserRole.AGENT_VISA]: 8, // Service visa
      };

      const categoryId = roleToCategoryMap[user.role];

      if (!categoryId) {
        throw new NotFoundException('No category found for the user role');
      }

      await this.chatService.sendMessageAgent(
        sendMessageDto,
        user.id,
        categoryId,
      );

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
