import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  UseGuards,
  UseFilters,
  Get,
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
import { ApiBody } from '@nestjs/swagger';
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

@Controller('ticket')
@UseFilters(new ErrorExceptionFilter())
export class TicketController {
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
        case 2:
          await this.ticketService.createTicketBillet2Client({
            categoryId: 1,
            subcategoryId,
            ...createTicketDto,
          });
        case 3:
          await this.ticketService.createTicketBillet3Client({
            categoryId: 1,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 4:
          await this.ticketService.createTicketBillet4Client({
            categoryId: 1,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 5:
          await this.ticketService.createTicketBillet5Client({
            categoryId: 1,
            subcategoryId,
            ...createTicketDto,
          });
          break;
        case 6:
          await this.ticketService.createTicketBillet6Client({
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
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
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
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
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
    @Res() res: Response,
  ) {
    try {
      const { subcategory: subcategoryId } = createTicketDto;

      switch (subcategoryId) {
        case 1:
          await this.ticketService.createTicketHotel1Client({
            categoryId: 2,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 2:
          await this.ticketService.createTicketHotel2Client({
            categoryId: 2,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 3:
          await this.ticketService.createTicketHotel3Client({
            categoryId: 2,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 4:
          await this.ticketService.createTicketHotel4Client({
            categoryId: 2,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 5:
          await this.ticketService.createTicketHotel5Client({
            categoryId: 2,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 6:
          await this.ticketService.createTicketHotel6Client({
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
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
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
      const { subcategory: subcategoryId } = body;
      let metadata: any;

      switch (subcategoryId) {
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
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
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
    @Res() res: Response,
  ) {
    try {
      const { subcategory: subcategoryId } = createTicketDto;

      switch (subcategoryId) {
        case 1:
          await this.ticketService.createTicketFinance1Client({
            categoryId: 3,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 2:
          await this.ticketService.createTicketFinance2Client({
            categoryId: 3,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 3:
          await this.ticketService.createTicketFinance3Client({
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
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
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
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
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
    @Res() res: Response,
  ) {
    try {
      const { subcategory: subcategoryId } = createTicketDto;

      switch (subcategoryId) {
        case 1:
          await this.ticketService.createTicketSales1Client({
            categoryId: 4,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 2:
          await this.ticketService.createTicketSales2Client({
            categoryId: 4,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 3:
          await this.ticketService.createTicketSales3Client({
            categoryId: 4,
            subcategoryId,
            ...createTicketDto,
          });
          break;

        case 4:
          await this.ticketService.createTicketSales4Client({
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
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
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
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
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
    @Res() res: Response,
  ) {
    try {
      const { subcategory: subcategoryId } = createTicketDto;

      switch (subcategoryId) {
        case 1:
          await this.ticketService.createTicketTravel1Client({
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
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
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
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
    }
  }
}
