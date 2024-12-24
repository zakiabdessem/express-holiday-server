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

import { TicketBillet1CreateDto } from './dtos/ticket-create-airline.dto';
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
    @Body() createTicketDto: TicketBillet1CreateDto,
    @Res() res: Response,
  ) {
    try {
      await this.ticketService.createTicketBillet1Client(createTicketDto);

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
