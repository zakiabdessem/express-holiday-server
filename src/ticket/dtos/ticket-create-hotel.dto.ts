import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  PassengerDetailsDto,
  TicketPriority,
} from './ticket-create-airline.dto';
import { Type } from 'class-transformer';

enum TypeOfService {
  TRANSFERT = 'Transfert',
  EXCURSION = 'Excursion',
  HEBERGEMENT = 'Hébergement',
  AUTRE = 'Autre',
}

enum TypeOfModification {
  DATE_MODIFICATION = 'Modification de la date',
  ROOM_MODIFICATION = 'Modification de la chambre',
  HOTEL_MODIFICATION = "Modification d'hôtels",
  ARRANGEMENT_MODIFICATION = "Modification d'arrangement/option",
}

export class TicketHotel1CreateDto {
  @ApiProperty({
    example: '1',
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
  // priority: TicketPriority; // Enum for ticket priority

  @ApiProperty({
    example: 'Refund due to cancellation',
    description: 'Reason for the refund request',
    required: false,
  })
  @IsString()
  @IsOptional()
  refundReason: string;

  @ApiProperty({
    example: 'VCHR123456',
    description: 'Numéro de voucher',
    required: false,
  })
  @IsString()
  @IsOptional()
  voucherNumber: string;

  @ApiProperty({
    example: 'R123456',
    description: 'Numéro de réservation',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  reserveNumber: string;

  @IsNotEmpty()
  @IsEnum(TypeOfService)
  @ApiProperty({
    example: 'Transfet',
    description: 'Type de prestation',
    enum: TypeOfService,
    required: true,
  })
  typeOfService: TypeOfService;

  @ApiProperty({
    example: 'R123456',
    description: 'ID réservation (fournisseur)',
    required: false,
  })
  @IsString()
  @IsOptional()
  supplierReservationId: string;

  @ApiProperty({
    example: { firstName: 'John', lastName: 'Doe' },
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
    typeOfService: TypeOfService,
    reserveNumber: string,
    voucherNumber: string,
    refundReason: string,
    description: string,
    supplierReservationId: string,
    passenger: PassengerDetailsDto,
  ) {
    this.typeOfService = typeOfService;
    this.reserveNumber = reserveNumber;
    this.voucherNumber = voucherNumber;
    this.passenger = passenger;
    this.supplierReservationId = supplierReservationId;
    this.refundReason = refundReason;
    this.description = description;
  }
}

export class TicketHotel2CreateDto {
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
    example: 'Modification Reason',
    description: 'Motif de modification',
    required: false,
  })
  @IsString()
  @IsOptional()
  changeReason: string;

  @ApiProperty({
    example: 'R123456',
    description: 'Numéro de réservation',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  reserveNumber: string;

  @IsNotEmpty()
  @IsEnum(TypeOfService)
  @ApiProperty({
    example: 'Transfet',
    description: 'Type de prestation',
    enum: TypeOfService,
    required: true,
  })
  typeOfService: TypeOfService;

  @IsNotEmpty()
  @IsEnum(TypeOfModification)
  @ApiProperty({
    example: 'Modification type',
    description: 'Type de prestation',
    enum: TypeOfModification,
    required: true,
  })
  typeOfModification: TypeOfModification;

  @ApiProperty({
    example: 'R123456',
    description: 'ID réservation (fournisseur)',
    required: false,
  })
  @IsString()
  @IsOptional()
  supplierReservationId: string;

  @ApiProperty({
    example: { firstName: 'John', lastName: 'Doe' },
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
    subcategory: number,
    changeReason: string,
    reserveNumber: string,
    typeOfService: TypeOfService,
    typeOfModification: TypeOfModification,
    supplierReservationId: string,
    passenger: PassengerDetailsDto,
    description: string,
  ) {
    this.changeReason = changeReason;
    this.reserveNumber = reserveNumber;
    this.typeOfService = typeOfService;
    this.typeOfModification = typeOfModification;
    this.supplierReservationId = supplierReservationId;
    this.passenger = passenger;
    this.description = description;
  }
}

export class TicketHotel3CreateDto {
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
  // priority: TicketPriority; // Enum for ticket priority

  @ApiProperty({
    example: 'Refund due to cancellation',
    description: 'Objet de réclamation',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  refundReason: string;

  @ApiProperty({
    example: 'VCHR123456',
    description: 'Numéro de voucher',
    required: false,
  })
  @IsString()
  @IsOptional()
  voucherNumber: string;

  @ApiProperty({
    example: 'R123456',
    description: 'Numéro de réservation',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  reserveNumber: string;

  @ApiProperty({
    example: 'R123456',
    description: 'ID réservation (fournisseur)',
    required: false,
  })
  @IsString()
  @IsOptional()
  supplierReservationId: string;

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
    subcategory: number,
    refundReason: string,
    voucherNumber: string,
    reserveNumber: string,
    supplierReservationId: string,
    description: string,
  ) {
    this.refundReason = refundReason;
    this.voucherNumber = voucherNumber;
    this.reserveNumber = reserveNumber;
    this.supplierReservationId = supplierReservationId;
    this.description = description;
  }
}

export class TicketHotel4CreateDto {
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
  // priority: TicketPriority; // Enum for ticket priority

  @ApiProperty({
    example: [{ firstName: 'John', lastName: 'Doe' }],
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
    example: '2023-12-25',
    description: 'Date de départ',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  departureDate: string;

  @ApiProperty({
    example: '2023-12-30',
    description: "Date d'arrivé",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  arrivalDate: string;

  @ApiProperty({
    example: 'Paris',
    description: 'Lieu de départ',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  departureLocation: string;

  @ApiProperty({
    example: 'Lyon',
    description: "Lieu d'arrivé",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  arrivalLocation: string;

  @ApiProperty({
    example: true,
    description: 'Un transfert aller seulement',
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  oneWayTransfer: boolean;

  @ApiProperty({
    example: true,
    description: 'Un transfert aller retour',
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  roundTripTransfer: boolean;

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
    subcategory: number,
    passengers: PassengerDetailsDto[],
    departureDate: string,
    arrivalDate: string,
    departureLocation: string,
    arrivalLocation: string,
    oneWayTransfer: boolean,
    roundTripTransfer: boolean,
    description: string,
  ) {
    this.passengers = passengers;
    this.departureDate = departureDate;
    this.arrivalDate = arrivalDate;
    this.departureLocation = departureLocation;
    this.arrivalLocation = arrivalLocation;
    this.oneWayTransfer = oneWayTransfer;
    this.roundTripTransfer = roundTripTransfer;
    this.description = description;
  }
}

export class TicketHotel5CreateDto {
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
    example: 'R123456',
    description: 'Numéro de réservation',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  reserveNumber: string;

  @IsNotEmpty()
  @IsEnum(TypeOfService)
  @ApiProperty({
    example: 'Transfet',
    description: 'Type de prestation',
    enum: TypeOfService,
    required: true,
  })
  typeOfService: TypeOfService;

  @ApiProperty({
    example: 'R123456',
    description: 'ID réservation (fournisseur)',
    required: false,
  })
  @IsString()
  @IsOptional()
  supplierReservationId: string;

  @ApiProperty({
    example: 'Change Reason',
    description: 'Motif de modification',
    required: false,
  })
  @IsString()
  @IsOptional()
  changeReason: string;

  @ApiProperty({
    example: { firstName: 'John', lastName: 'Doe' },
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
    subcategory: number,
    reserveNumber: string,
    typeOfService: TypeOfService,
    supplierReservationId: string,
    changeReason: string,
    passenger: PassengerDetailsDto,
    description: string,
  ) {
    this.reserveNumber = reserveNumber;
    this.typeOfService = typeOfService;
    this.supplierReservationId = supplierReservationId;
    this.changeReason = changeReason;
    this.passenger = passenger;
    this.description = description;
  }
}

export class TicketHotel6CreateDto {
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
    example: 'Subject',
    description: 'Subject',
    required: false,
  })
  @IsString()
  @IsOptional()
  subject: string;

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

  constructor(subcategory: number, subject: string, description: string) {
    this.subject = subject;
    this.description = description;
  }
}

export class TicketCreateHotelDtoApi {
  @ApiProperty({ type: TicketHotel1CreateDto, required: false })
  'Demande De Remboursement D un Hôtel'?: TicketHotel1CreateDto;

  @ApiProperty({ type: TicketHotel2CreateDto, required: false })
  'Demande De Modification D un Hôtel'?: TicketHotel2CreateDto;

  @ApiProperty({ type: TicketHotel3CreateDto, required: false })
  "Réclamation D'un Hotel"?: TicketHotel3CreateDto;

  @ApiProperty({ type: TicketHotel4CreateDto, required: false })
  "Demande D'un Transfert"?: TicketHotel4CreateDto;

  @ApiProperty({ type: TicketHotel5CreateDto, required: false })
  "Demande De Confirmation D'un Hôtel"?: TicketHotel5CreateDto;

  @ApiProperty({ type: TicketHotel6CreateDto, required: false })
  'Demande Diverse'?: TicketHotel6CreateDto;
}
