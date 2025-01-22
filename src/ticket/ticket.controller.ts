import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  UseGuards,
  UseFilters,
  Get,
  Logger,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';

import {
  TicketBillet1CreateDto,
  TicketBillet2CreateDto,
  TicketBillet3CreateDto,
  TicketBillet4CreateDto,
  TicketBillet5CreateDto,
  TicketBillet6CreateDto,
  TicketCreateAirlineDtoApi,
} from './dtos/ticket-create-airline.dto';
import { TicketService } from './ticket.service';
import { GQLRolesGuard } from 'src/guard/gql-role.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/decorator/role.entity';
import { ErrorExceptionFilter } from 'src/filter/auth-exception.filter';
import { DynamicValidationPipe } from './ticket.pipeline';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import {
  TicketCreateHotelDtoApi,
  TicketHotel1CreateDto,
  TicketHotel2CreateDto,
  TicketHotel3CreateDto,
  TicketHotel4CreateDto,
  TicketHotel5CreateDto,
  TicketHotel6CreateDto,
} from './dtos/ticket-create-hotel.dto';
import { getDtoMetadata } from 'src/utils/dto-metadata.util';
import {
  TicketCreateFinanceDtoApi,
  TicketFinance1Dto,
  TicketFinance2Dto,
  TicketFinance3Dto,
} from './dtos/ticket-create-finance.dto';
import {
  TicketCreateSalesDtoApi,
  TicketSales1Dto,
  TicketSales2Dto,
  TicketSales3Dto,
  TicketSales4Dto,
} from './dtos/ticket-create-sales.dto';
import {
  TicketCreateTravelDtoApi,
  TicketTravelDetailsDto,
} from './dtos/ticket-create-travel.dto';
import { CurrentUser } from 'src/decorator/user.entity';
import { UserEntity } from 'src/user/user.schema';
import { QueryFailedError } from 'typeorm';
import { SkipThrottle } from '@nestjs/throttler';
import { Ticket } from './ticket.schema';

@Controller('ticket')
@UseFilters(new ErrorExceptionFilter())
export class TicketController {
  private readonly logger = new Logger(TicketController.name);

  private static readonly TicketAirlineDto: Record<
    number,
    Record<number, any>
  > = {
    1: TicketBillet1CreateDto as unknown as Record<number, any>,
    2: TicketBillet2CreateDto as unknown as Record<number, any>,
    3: TicketBillet3CreateDto as unknown as Record<number, any>,
    4: TicketBillet4CreateDto as unknown as Record<number, any>,
    5: TicketBillet5CreateDto as unknown as Record<number, any>,
    6: TicketBillet6CreateDto as unknown as Record<number, any>,
  };

  private static readonly TicketHotelDto: Record<number, Record<number, any>> =
    {
      1: TicketHotel1CreateDto as unknown as Record<number, any>,
      2: TicketHotel2CreateDto as unknown as Record<number, any>,
      3: TicketHotel3CreateDto as unknown as Record<number, any>,
      4: TicketHotel4CreateDto as unknown as Record<number, any>,
      5: TicketHotel5CreateDto as unknown as Record<number, any>,
      6: TicketHotel6CreateDto as unknown as Record<number, any>,
    };

  private static readonly TicketFinancelDto: Record<
    number,
    Record<number, any>
  > = {
    1: TicketFinance1Dto as unknown as Record<number, any>,
    2: TicketFinance2Dto as unknown as Record<number, any>,
    3: TicketFinance3Dto as unknown as Record<number, any>,
  };

  private static readonly TicketSalesDto: Record<number, Record<number, any>> =
    {
      1: TicketSales1Dto as unknown as Record<number, any>,
      2: TicketSales2Dto as unknown as Record<number, any>,
      3: TicketSales3Dto as unknown as Record<number, any>,
      4: TicketSales4Dto as unknown as Record<number, any>,
    };

  private static readonly TicketTravelDto: Record<number, Record<number, any>> =
    {
      1: TicketTravelDetailsDto as unknown as Record<number, any>,
    };

  constructor(private readonly ticketService: TicketService) {}

  @Post('create/1')
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(GQLRolesGuard)
  @ApiBody({
    type: TicketCreateAirlineDtoApi,
    description: 'Service Billetterie aerienne',
  })
  async createAirline(
    @Body(new DynamicValidationPipe(TicketController.TicketAirlineDto))
    createTicketDto: any,
    @CurrentUser() user: UserEntity,
    @Res() res: Response,
  ) {
    try {
      const { subcategory: subcategoryId } = createTicketDto;

      switch (subcategoryId) {
        case 1:
          await this.ticketService.createTicketBillet1Client({
            userId: user.id,
            categoryId: 1,
            subcategoryId,
            ...createTicketDto,
          });
          break;
        case 2:
          await this.ticketService.createTicketBillet2Client({
            userId: user.id,
            categoryId: 1,
            subcategoryId,
            ...createTicketDto,
          });
        case 3:
          await this.ticketService.createTicketBillet3Client({
            userId: user.id,
            categoryId: 1,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 4:
          await this.ticketService.createTicketBillet4Client({
            userId: user.id,
            categoryId: 1,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 5:
          await this.ticketService.createTicketBillet5Client({
            userId: user.id,
            categoryId: 1,
            subcategoryId,
            ...createTicketDto,
          });
          break;
        case 6:
          await this.ticketService.createTicketBillet6Client({
            userId: user.id,
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
      this.logger.error('Error in createHotel', error.stack);

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

  @Post('metadata/1')
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(GQLRolesGuard)
  async getAirlineMetadata(
    @Body() body: { subcategory: number },
    @Res() res: Response,
  ) {
    try {
      const { subcategory: subcategoryId } = body;
      let metadata: any;

      switch (subcategoryId) {
        case 1:
          metadata = getDtoMetadata(TicketBillet1CreateDto);
          break;
        case 2:
          metadata = getDtoMetadata(TicketBillet2CreateDto);
          break;
        case 3:
          metadata = getDtoMetadata(TicketBillet3CreateDto);
          break;
        case 4:
          metadata = getDtoMetadata(TicketBillet4CreateDto);
          break;
        case 5:
          metadata = getDtoMetadata(TicketBillet5CreateDto);
          break;
        case 6:
          metadata = getDtoMetadata(TicketBillet6CreateDto);
          break;
        default:
          throw new Error('Unsupported ticket category');
      }

      return res.status(HttpStatus.OK).json(metadata);
    } catch (error) {
      this.logger.error('Error in createHotel', error.stack);

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

  @Post('create/2')
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(GQLRolesGuard)
  @ApiBody({
    type: TicketCreateHotelDtoApi,
    description: 'Service Hotel',
  })
  async createHotel(
    @Body(new DynamicValidationPipe(TicketController.TicketHotelDto))
    createTicketDto: any,
    @CurrentUser() user: UserEntity,
    @Res() res: Response,
  ) {
    try {
      const { subcategory: subcategoryId } = createTicketDto;

      switch (subcategoryId) {
        case 1:
          await this.ticketService.createTicketHotel1Client({
            userId: user.id,
            categoryId: 2,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 2:
          await this.ticketService.createTicketHotel2Client({
            userId: user.id,
            categoryId: 2,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 3:
          await this.ticketService.createTicketHotel3Client({
            userId: user.id,
            categoryId: 2,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 4:
          await this.ticketService.createTicketHotel4Client({
            userId: user.id,
            categoryId: 2,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 5:
          await this.ticketService.createTicketHotel5Client({
            userId: user.id,
            categoryId: 2,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 6:
          await this.ticketService.createTicketHotel6Client({
            userId: user.id,
            categoryId: 2,
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
      this.logger.error('Error in createHotel', error.stack);

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

  @Post('metadata/2')
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(GQLRolesGuard)
  async getHotelMetadata(
    @Body() body: { subcategory: number },
    @Res() res: Response,
  ) {
    try {
      const { subcategory } = body;
      let metadata: any;

      switch (subcategory) {
        case 1:
          metadata = getDtoMetadata(TicketHotel1CreateDto);
          break;
        case 2:
          metadata = getDtoMetadata(TicketHotel2CreateDto);
          break;
        case 3:
          metadata = getDtoMetadata(TicketHotel3CreateDto);
          break;
        case 4:
          metadata = getDtoMetadata(TicketHotel4CreateDto);
          break;
        case 5:
          metadata = getDtoMetadata(TicketHotel5CreateDto);
          break;
        case 6:
          metadata = getDtoMetadata(TicketHotel6CreateDto);
          break;
        default:
          throw new Error('Unsupported ticket category');
      }

      return res.status(HttpStatus.OK).json(metadata);
    } catch (error) {
      this.logger.error('Error in createHotel', error.stack);

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

  @Post('create/3')
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(GQLRolesGuard)
  @ApiBody({
    type: TicketCreateFinanceDtoApi,
    description: 'Service Finance',
  })
  async createFinance(
    @Body(new DynamicValidationPipe(TicketController.TicketFinancelDto))
    createTicketDto: any,
    @CurrentUser() user: UserEntity,
    @Res() res: Response,
  ) {
    try {
      const { subcategory: subcategoryId } = createTicketDto;

      switch (subcategoryId) {
        case 1:
          await this.ticketService.createTicketFinance1Client({
            userId: user.id,
            categoryId: 3,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 2:
          await this.ticketService.createTicketFinance2Client({
            userId: user.id,
            categoryId: 3,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 3:
          await this.ticketService.createTicketFinance3Client({
            userId: user.id,
            categoryId: 3,
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
      this.logger.error('Error in createHotel', error.stack);

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

  @Post('metadata/3')
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(GQLRolesGuard)
  async getFinanceMetadata(
    @Body() body: { subcategory: number },
    @Res() res: Response,
  ) {
    try {
      const { subcategory: subcategoryId } = body;
      let metadata: any;

      switch (subcategoryId) {
        case 1:
          metadata = getDtoMetadata(TicketFinance1Dto);
          break;
        case 2:
          metadata = getDtoMetadata(TicketFinance2Dto);
          break;
        case 3:
          metadata = getDtoMetadata(TicketFinance3Dto);
          break;
        default:
          throw new Error('Unsupported ticket category');
      }

      return res.status(HttpStatus.OK).json(metadata);
    } catch (error) {
      this.logger.error('Error in createHotel', error.stack);

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

  @Post('create/4')
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(GQLRolesGuard)
  @ApiBody({
    type: TicketCreateSalesDtoApi,
    description: 'Service Sales',
  })
  async createSales(
    @Body(new DynamicValidationPipe(TicketController.TicketSalesDto))
    createTicketDto: any,
    @CurrentUser() user: UserEntity,
    @Res() res: Response,
  ) {
    try {
      const { subcategory: subcategoryId } = createTicketDto;

      switch (subcategoryId) {
        case 1:
          await this.ticketService.createTicketSales1Client({
            userId: user.id,
            categoryId: 4,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 2:
          await this.ticketService.createTicketSales2Client({
            userId: user.id,
            categoryId: 4,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 3:
          await this.ticketService.createTicketSales3Client({
            userId: user.id,
            categoryId: 4,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 4:
          await this.ticketService.createTicketSales4Client({
            userId: user.id,
            categoryId: 4,
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
      this.logger.error('Error in createHotel', error.stack);

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

  @Post('metadata/4')
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(GQLRolesGuard)
  async getSalesMetadata(
    @Body() body: { subcategory: number },
    @Res() res: Response,
  ) {
    try {
      const { subcategory: subcategoryId } = body;
      let metadata: any;

      switch (subcategoryId) {
        case 1:
          metadata = getDtoMetadata(TicketSales1Dto);
          break;
        case 2:
          metadata = getDtoMetadata(TicketSales2Dto);
          break;
        case 3:
          metadata = getDtoMetadata(TicketSales3Dto);
          break;
        case 4:
          metadata = getDtoMetadata(TicketSales4Dto);
          break;
        default:
          throw new Error('Unsupported ticket category');
      }

      return res.status(HttpStatus.OK).json(metadata);
    } catch (error) {
      this.logger.error('Error in createHotel', error.stack);

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

  @Post('create/5')
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(GQLRolesGuard)
  @ApiBody({
    type: TicketCreateTravelDtoApi,
    description: 'Service Travel',
  })
  async createTravel(
    @Body(new DynamicValidationPipe(TicketController.TicketTravelDto))
    createTicketDto: any,
    @CurrentUser() user: UserEntity,
    @Res() res: Response,
  ) {
    try {
      const { subcategory: subcategoryId } = createTicketDto;

      switch (subcategoryId) {
        case 1:
          await this.ticketService.createTicketTravel1Client({
            userId: user.id,
            categoryId: 5,
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
      this.logger.error('Error in createHotel', error.stack);

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

  @Post('metadata/5')
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(GQLRolesGuard)
  async getTravelMetadata(
    @Body() body: { subcategory: number },
    @Res() res: Response,
  ) {
    try {
      const { subcategory: subcategoryId } = body;
      let metadata: any;

      switch (subcategoryId) {
        case 1:
          metadata = getDtoMetadata(TicketTravelDetailsDto);
          break;
        default:
          throw new Error('Unsupported ticket category');
      }

      return res.status(HttpStatus.OK).json(metadata);
    } catch (error) {
      this.logger.error('Error in createHotel', error.stack);

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

  @Get(':id')
  @ApiOperation({
    summary: 'Get single ticket details',
    description: 'Fetch details of a ticket by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the ticket to retrieve',
    required: true,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Details of the ticket retrieved successfully.',
    type: Ticket,
  })
  @ApiResponse({
    status: 404,
    description: 'Ticket not found.',
  })
  async getTicketById(@Param('id', ParseIntPipe) id: number): Promise<Ticket> {
    const ticket = await this.ticketService.findOne(id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    return ticket;
  }

  @SkipThrottle()
  @Get('my-tickets')
  @Roles(UserRole.CLIENT)
  @UseGuards(GQLRolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get tickets for the authenticated user',
    description:
      'Returns a list of tickets associated with the authenticated user.',
  })
  async myTickets(@CurrentUser() user: UserEntity) {
    return this.ticketService.findAllById(user.id);
  }

  @SkipThrottle()
  @Get('search')
  @Roles(UserRole.ADMIN)
  @UseGuards(GQLRolesGuard)
  @ApiOperation({
    summary: 'Search tickets by query parameters',
    description:
      'Returns a list of tickets filtered by the provided query parameters.',
  })
  @ApiQuery({
    name: 'firstName',
    required: false,
    description: 'First name of the ticket owner.',
  })
  @ApiQuery({
    name: 'lastName',
    required: false,
    description: 'Last name of the ticket owner.',
  })
  @ApiQuery({
    name: 'email',
    required: false,
    description: 'Email of the ticket owner.',
  })
  @ApiQuery({
    name: 'ticketId',
    required: false,
    description: 'ID of the ticket.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of tickets retrieved successfully.',
    type: [Ticket],
  })
  async ticketsByQuery(
    @Query('firstName') firstName?: string,
    @Query('lastName') lastName?: string,
    @Query('email') email?: string,
    @Query('ticketId') ticketId?: string,
  ) {
    return this.ticketService.findAllByQuery({
      firstName,
      lastName,
      email,
      ticketId,
    });
  }
}
