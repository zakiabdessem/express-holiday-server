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

import {
  TicketBillet1CreateDto,
  TicketBillet2CreateDto,
  TicketCreateDtoApi,
} from './dtos/ticket-create-airline.dto';
import { TicketService } from './ticket.service';
import { GQLRolesGuard } from 'src/guard/gql-role.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/decorator/role.entity';
import { ErrorExceptionFilter } from 'src/filter/auth-exception.filter';
import { DynamicValidationPipe } from './ticket.pipeline';
import { ApiBody } from '@nestjs/swagger';

@Controller('ticket')
@UseFilters(new ErrorExceptionFilter())
export class TicketController {
  private static readonly TicketAirlineDto: Record<
    number,
    Record<number, any>
  > = {
    1: TicketBillet1CreateDto as unknown as Record<number, any>,
    2: TicketBillet2CreateDto as unknown as Record<number, any>,
    // general: TicketGeneralCreateDto
  };

  constructor(private readonly ticketService: TicketService) {}

  @Post('create/1')
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(GQLRolesGuard)
  @ApiBody({
    type: TicketCreateDtoApi,
    description: 'Service Billetterie aerienne',
  })
  async create(
    @Body(new DynamicValidationPipe(TicketController.TicketAirlineDto))
    createTicketDto: any,
    @Res() res: Response,
  ) {
    try {
      const { subcategory: subcategoryId } = createTicketDto;

      switch (subcategoryId) {
        case 1:
          await this.ticketService.createTicketBillet1Client({
            categoryId: 1,
            subcategoryId,
            ...createTicketDto,
          });
          break;
        case 2: //TODO: DIR map for passenger + min length passwnger
          await this.ticketService.createTicketBillet2Client({
            categoryId: 1,
            subcategoryId,
            ...createTicketDto,
          });
          break;
        default:
          throw new Error('Unsupported ticket category');
      }

      return res.status(HttpStatus.OK).json({
        message: 'Ticket created successfully',
      });
    } catch (error) {
      console.log('🚀 ~ TicketController ~ error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
    }
  }
}
