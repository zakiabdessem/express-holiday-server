import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  TicketHotel1CreateDto,
  TicketHotel2CreateDto,
  TicketHotel3CreateDto,
} from './ticket-create-hotel.dto';

export class PassengerDetailsDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of the passenger',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the passenger',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'T12345',
    description: 'Ticket number of the passenger',
    required: false,
  })
  @IsString()
  @IsOptional()
  ticketNumber: string;
}

export enum TicketStatus {
  INPROGRESS = 'inprogress',
  CLOSED = 'closed',
  OPEN = 'open',
}

export enum TicketPriority {
  URGENT = 'urgent',
  HIGH = 'high',
  LOW = 'low',
  MEDIUM = 'medium',
}

export class TicketBillet1CreateDto {
  @ApiProperty({
    example: '1',
    description: 'Subcategory of the ticket',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  subcategory: number;

  @ApiProperty({
    example: 'Issue description here',
    description: 'Detailed description of the issue, min 25 max 255',
    required: true,
    minimum: 25,
    maximum: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(25)
  @MaxLength(255)
  description: string; //DIMA

  // @IsNotEmpty()
  // @IsEnum(TicketPriority)
  // @ApiProperty({
  //   example: 'high',
  //   description: 'Priority of the ticket',
  //   enum: TicketPriority,
  //   required: true,
  // })
  // priority: string;

  @ApiProperty({
    example: 'Issue subject here',
    description: 'Detailed subject of the issue, min 6 max 120',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(120)
  subject: string;

  constructor(
    subject: string,
    description: string,
  ) {
    this.subject = subject;
    this.description = description;
  }
}

export class TicketBillet2CreateDto {
  @ApiProperty({
    example: '2',
    description: 'Subcategory of the ticket',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  subcategory: number;

  // @IsNotEmpty()
  // @IsEnum(TicketPriority)
  // @ApiProperty({
  //   example: 'low',
  //   description: 'Priority of the ticket',
  //   enum: TicketPriority,
  //   required: true,
  // })
  // priority: TicketPriority;

  @ApiProperty({
    example: 'PNRXYZ123',
    description: 'PNR (Passenger Name Record)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  pnr: string;

  @ApiProperty({
    example: 'Refund due to cancellation',
    description: 'Reason for the refund request',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  refundReason: string;

  @ApiProperty({
    example: [{ firstName: 'John', lastName: 'Doe', ticketNumber: 'T12345' }],
    description: 'Passenger details (name and ticket numbers)',
    required: true,
    isArray: true,
    minimum: 1,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PassengerDetailsDto) // Nested DTO for passenger details
  passengers: PassengerDetailsDto[];

  @ApiProperty({
    example: 'Detailed description of the issue here...',
    description: 'Description of the issue',
    required: true,
    minimum: 25,
    maximum: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(25)
  @MaxLength(255)
  description: string;

  constructor(
    refundReason: string,
    pnr: string,
    passengers: PassengerDetailsDto[],
    description: string,
  ) {
    this.refundReason = refundReason;
    this.pnr = pnr;
    this.passengers = passengers;
    this.description = description;
  }
}

export class TicketBillet3CreateDto {
  @ApiProperty({
    example: '3',
    description: 'Subcategory of the ticket',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  subcategory: number;

  // @IsNotEmpty()
  // @IsEnum(TicketPriority)
  // @ApiProperty({
  //   example: 'low',
  //   description: 'Priority of the ticket',
  //   enum: TicketPriority,
  //   required: true,
  // })
  // priority: TicketPriority;

  @ApiProperty({
    example: 'Wrong date',
    description: 'Reason for change (Modification Reason)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  changeReason: string;

  @ApiProperty({
    example: 'PNRXYZ123',
    description: 'PNR (Passenger Name Record)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  pnr: string;

  @ApiProperty({
    example: 'Refund due to cancellation',
    description: 'Reason for the refund request',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  refundReason: string;

  @ApiProperty({
    example: [
      'Date Aller',
      'Date Retour',
      'Itinéraire Aller',
      'Itinéraire Retour',
    ],
    description: 'Selected options for dates and itineraries',
    required: false,
    isArray: true,
    enum: [
      'Date Aller',
      'Date Retour',
      'Itinéraire Aller',
      'Itinéraire Retour',
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  @IsString({ each: true })
  datesAndItineraries: string[];

  @ApiProperty({
    example: [{ firstName: 'John', lastName: 'Doe', ticketNumber: 'T12345' }],
    description: 'Passenger details (name and ticket numbers)',
    required: true,
    isArray: true,
    minimum: 1,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PassengerDetailsDto)
  passengers: PassengerDetailsDto[];

  @ApiProperty({
    example: 'Detailed description of the issue here...',
    description: 'Description of the issue',
    required: true,
    minimum: 25,
    maximum: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(25)
  @MaxLength(255)
  description: string;

  constructor(
    changeReason: string,
    refundReason: string,
    pnr: string,
    passengers: PassengerDetailsDto[],
    description: string,
  ) {
    this.changeReason = changeReason;
    this.refundReason = refundReason;
    this.pnr = pnr;
    this.passengers = passengers;
    this.description = description;
  }
}

export class TicketBillet4CreateDto {
  @ApiProperty({
    example: '4',
    description: 'Subcategory of the ticket',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  subcategory: number;

  // @IsNotEmpty()
  // @IsEnum(TicketPriority)
  // @ApiProperty({
  //   example: 'low',
  //   description: 'Priority of the ticket',
  //   enum: TicketPriority,
  //   required: true,
  // })
  // priority: TicketPriority;

  @ApiProperty({
    example: 'Issue subject here',
    description: 'Detailed subject of the issue, min 6 max 120',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(120)
  subject: string;

  @ApiProperty({
    example: 'PNRXYZ123',
    description: 'PNR (Passenger Name Record)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  pnr: string;

  @ApiProperty({
    example: { firstName: 'John', lastName: 'Doe', ticketNumber: 'T12345' },
    description: 'Details of the passenger',
    required: true,
  })
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => PassengerDetailsDto)
  passenger: PassengerDetailsDto;

  @ApiProperty({
    example: 'Detailed description of the issue here...',
    description: 'Description of the issue',
    required: true,
    minimum: 25,
    maximum: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(25)
  @MaxLength(255)
  description: string;

  constructor(
    subject: string,
    pnr: string,
    passenger: PassengerDetailsDto,
    description: string,
  ) {
    this.subject = subject;
    this.pnr = pnr;
    this.passenger = passenger;
    this.description = description;
  }
}

export class TicketBillet5CreateDto {
  @ApiProperty({
    example: '5',
    description: 'Subcategory of the ticket',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  subcategory: number;

  // @IsNotEmpty()
  // @IsEnum(TicketPriority)
  // @ApiProperty({
  //   example: 'low',
  //   description: 'Priority of the ticket',
  //   enum: TicketPriority,
  //   required: true,
  // })
  // priority: TicketPriority;

  @ApiProperty({
    example: '5',
    description: 'Nombre de billets à vendre par mois (estimation)',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  estimatedTickets: number;

  @ApiProperty({
    example: '5',
    description: 'Votre office ID *',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  officeId: number;

  @ApiProperty({
    example: 'Detailed description of the issue here...',
    description: 'Description of the issue',
    required: true,
    minimum: 25,
    maximum: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(25)
  @MaxLength(255)
  description: string;

  constructor(estimatedTickets: number, officeId: number, description: string) {
    this.estimatedTickets = estimatedTickets;
    this.officeId = officeId;
    this.description = description;
  }
}

export class TicketBillet6CreateDto {
  @ApiProperty({
    example: '6',
    description: 'Subcategory of the ticket',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  subcategory: number;

  // @IsNotEmpty()
  // @IsEnum(TicketPriority)
  // @ApiProperty({
  //   example: 'low',
  //   description: 'Priority of the ticket',
  //   enum: TicketPriority,
  //   required: true,
  // })
  // priority: TicketPriority;

  @ApiProperty({
    example: 'Issue subject here',
    description: 'Detailed subject of the issue, min 6 max 120',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(120)
  subject: string;

  @ApiProperty({
    example: 'PNRXYZ123',
    description: 'PNR (Passenger Name Record)',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  pnr: string;

  @ApiProperty({
    example: 'Detailed description of the issue here...',
    description: 'Description of the issue',
    required: true,
    minimum: 25,
    maximum: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(25)
  @MaxLength(255)
  description: string;

  constructor(subject: string, pnr: string, description: string) {
    this.subject = subject;
    this.pnr = pnr;
    this.description = description;
  }
}

export class TicketCreateAirlineDtoApi {
  @ApiProperty({ type: TicketBillet1CreateDto, required: false })
  'Request / Claim For A Ticket'?: TicketBillet1CreateDto;

  @ApiProperty({ type: TicketBillet2CreateDto, required: false })
  'Ticket Refund Request'?: TicketBillet2CreateDto;

  @ApiProperty({ type: TicketBillet3CreateDto, required: false })
  'Demande De Modification Dun Billet'?: TicketBillet3CreateDto;

  @ApiProperty({ type: TicketBillet4CreateDto, required: false })
  'Demande De Confirmation Dun Billet'?: TicketBillet4CreateDto;

  @ApiProperty({ type: TicketBillet5CreateDto, required: false })
  'Demande De Connexion RTS'?: TicketBillet5CreateDto;

  @ApiProperty({ type: TicketBillet6CreateDto, required: false })
  'Demande De Tarif Spécial'?: TicketBillet6CreateDto;

  // @ApiProperty({ type: TicketHotel1CreateDto, required: false })
  // 'Demande De Remboursement D un Hôtel'?: TicketHotel1CreateDto;

  // @ApiProperty({ type: TicketHotel2CreateDto, required: false })
  // 'Demande De Modification D un Hôtel'?: TicketHotel2CreateDto;

  // @ApiProperty({ type: TicketHotel3CreateDto, required: false })
  // "Réclamation D'un Hotel"?: TicketHotel3CreateDto;
}
