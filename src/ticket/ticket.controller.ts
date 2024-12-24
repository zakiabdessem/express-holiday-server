import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';

import { TicketCreateDto } from './dtos/ticket-create.dto';
import { TicketService } from './ticket.service';
import { GQLRolesGuard } from 'src/guard/gql-role.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/decorator/role.entity';
import { AuthExceptionFilter } from 'src/filter/auth-exception.filter';

@Controller('ticket')
@UseFilters(new AuthExceptionFilter())
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('create')
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(GQLRolesGuard)
  async create(
    @Body() createTicketrDto: TicketCreateDto,
    @Res() res: Response,
  ) {
    try {
      await this.ticketService.createTicketClient(createTicketrDto);

      return res.status(HttpStatus.OK).json({
        message: 'Ticket created successfully',
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }
}
