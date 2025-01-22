import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';

enum RoomType {
  SINGLE = 'Chambre simple-غرفة عادية',
  DOUBLE = 'Chambre double-غرفة ثنائية',
  TRIPLE = 'Chambre triple-غرفة ثلاثية',
}

export class TicketSales1Dto {
  @ApiProperty({
    example: '1',
    description: 'Subcategory of the ticket',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  subcategory: number;

  @ApiProperty({
    example: 'Voyage à Paris',
    description: 'Objet du voyage',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(120)
  subject: string;

  @ApiProperty({
    example: '2024-01-15',
    description: 'Date de départ',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  departureDate: string;

  @ApiProperty({
    example: 'Alger',
    description: 'Origine du voyage',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  origin: string;

  @ApiProperty({
    example: 'Paris',
    description: 'Destination du voyage',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty({
    example: 2,
    description: 'Nombre de passagers',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  numberOfPassengers: number;

  @ApiProperty({
    example: 5,
    description: 'Nombre de jours de séjour',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  stayDuration: number;

  @ApiProperty({
    example: 'Détails du voyage...',
    description: 'Description du voyage',
    required: true,
    minimum: 25,
    maximum: 255,
  })
  @IsString()
  @IsOptional()
  description: string;

  constructor(
    subject: string,
    departureDate: string,
    origin: string,
    destination: string,
    numberOfPassengers: number,
    stayDuration: number,
    description: string,
  ) {
    this.subject = subject;
    this.departureDate = departureDate;
    this.origin = origin;
    this.destination = destination;
    this.numberOfPassengers = numberOfPassengers;
    this.stayDuration = stayDuration;
    this.description = description;
  }
}

export class TicketSales2Dto {
  @ApiProperty({
    example: '2',
    description: 'Subcategory of the ticket',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  subcategory: number;

  @ApiProperty({
    example: '2024-01-20',
    description: "Date d'arrivé",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  arrivalDate: string;

  @ApiProperty({
    example: 5,
    description: 'Nombre de jours de séjour',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  stayDuration: number;

  @ApiProperty({
    example: 'Excursion à la montagne',
    description: 'Excursion',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  excursion: string;

  @ApiProperty({
    example: 'Arrangement complet',
    description: 'Arrangement',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  arrangement: string;

  @ApiProperty({
    example: 'Options supplémentaires',
    description: 'Options',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  options: string;

  @ApiProperty({
    example: 'Transfert aéroport',
    description: 'Transfert',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  transfer: string;

  @ApiProperty({
    example: 2,
    description: 'Nombre de chambres',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  numberOfRooms: number;

  @ApiProperty({
    example: 'Hôtel Paris',
    description: 'Hôtels',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  hotels: string;

  @ApiProperty({
    example: 'Paris',
    description: 'Ville',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: 4,
    description: 'Nombre de passagers',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  numberOfPassengers: number;

  @ApiProperty({
    example: RoomType.SINGLE,
    description: 'Type de chambres',
    required: true,
    enum: RoomType,
  })
  @IsEnum(RoomType)
  @IsNotEmpty()
  roomType: RoomType;

  @ApiProperty({
    example: 'Détails du voyage...',
    description: 'Description du voyage',
    required: true,
    minimum: 25,
    maximum: 255,
  })
  @IsString()
  @IsOptional()
  description: string;

  constructor(
    arrivalDate: string,
    stayDuration: number,
    excursion: string,
    arrangement: string,
    options: string,
    transfer: string,
    numberOfRooms: number,
    hotels: string,
    city: string,
    numberOfPassengers: number,
    roomType: RoomType,
    description: string,
  ) {
    this.arrivalDate = arrivalDate;
    this.stayDuration = stayDuration;
    this.excursion = excursion;
    this.arrangement = arrangement;
    this.options = options;
    this.transfer = transfer;
    this.numberOfRooms = numberOfRooms;
    this.hotels = hotels;
    this.city = city;
    this.numberOfPassengers = numberOfPassengers;
    this.roomType = roomType;
    this.description = description;
  }
}

export class TicketSales3Dto {
  @ApiProperty({
    example: '3',
    description: 'Subcategory of the ticket',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  subcategory: number;

  @ApiProperty({
    example: 'Objet de réclamation',
    description: 'Objet de réclamation',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(120)
  subject: string;

  @ApiProperty({
    example: 'Detailed description of the issue here...',
    description: 'Description of the issue',
    required: true,
    minimum: 25,
    maximum: 255,
  })
  @IsString()
  @IsOptional()
  description: string;

  constructor(subject: string, description: string) {
    this.subject = subject;
    this.description = description;
  }
}

export class TicketSales4Dto {
  @ApiProperty({
    example: '4',
    description: 'Subcategory of the ticket',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  subcategory: number;

  @ApiProperty({
    example: 'John Doe',
    description: "Nom de l'utilisateur qui a besoin d'accéder à l'étranger",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  username: string;

  @ApiProperty({
    example: '2024-01-01',
    description: 'Date de début de période',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    example: '2024-01-15',
    description: 'Date de fin de période',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({
    example: "Détails de la demande d'accès à l'étranger...",
    description: 'Description de la demande',
    required: true,
    minimum: 25,
    maximum: 255,
  })
  @IsString()
  @IsOptional()
  description: string;

  constructor(
    username: string,
    startDate: string,
    endDate: string,
    description: string,
  ) {
    this.username = username;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
  }
}

export class TicketCreateSalesDtoApi {
  @ApiProperty({ type: TicketSales1Dto, required: false })
  'Demande Bloc De Siège'?: TicketSales1Dto;

  @ApiProperty({ type: TicketSales2Dto, required: false })
  'Demande Groupe (Hôtels)'?: TicketSales2Dto;

  @ApiProperty({ type: TicketSales3Dto, required: false })
  'Demande Diverse'?: TicketSales3Dto;

  @ApiProperty({ type: TicketSales4Dto, required: false })
  "Accès À L'Étranger"?: TicketSales4Dto;
}
