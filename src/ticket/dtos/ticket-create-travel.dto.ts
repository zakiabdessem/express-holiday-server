import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';

export enum RoomType {
  SINGLE = 'Chambre simple-غرفة عادية',
  DOUBLE = 'Chambre double-غرفة ثنائية',
  TRIPLE = 'Chambre triple-غرفة ثلاثية',
}

export enum SupplementOption {
  WITH_MEALS = 0, // With meals
  WITHOUT_MEALS = 1, // Without meals
}

export class TicketTravelDetailsDto {
  @ApiProperty({
    example: 2,
    description: 'Subcategory of the ticket',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  subcategoryId: number;

  @ApiProperty({
    example: 'فندق واحة الضيافة يوم 09 مارس',
    description: 'Departure details',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  departureLocation: string;

  @ApiProperty({
    example: RoomType.SINGLE,
    description: 'Type of room',
    required: true,
    enum: RoomType,
  })
  @IsNotEmpty()
  roomType: RoomType;

  @ApiProperty({
    example: SupplementOption.WITH_MEALS,
    description: 'Supplement option (0: With meals, 1: Without meals)',
    required: true,
    enum: SupplementOption,
  })
  @IsEnum(SupplementOption)
  @IsNotEmpty()
  supplement: SupplementOption;

  @ApiProperty({
    example: 2,
    description: 'Number of adults',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  numberOfAdults: number;

  @ApiProperty({
    example: 1,
    description: 'Number of children',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  numberOfChildren: number;

  @ApiProperty({
    example: 0,
    description: 'Number of babies',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  numberOfBabies: number;

  @ApiProperty({
    example: 'Détails de la réclamation...',
    description: 'Details of the claim',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  constructor(
    subcategoryId: number,
    departureLocation: string,
    roomType: RoomType,
    supplement: SupplementOption,
    numberOfAdults: number,
    numberOfChildren: number,
    numberOfBabies: number,
    description: string,
  ) {
    this.subcategoryId = subcategoryId;
    this.departureLocation = departureLocation;
    this.roomType = roomType;
    this.supplement = supplement;
    this.numberOfAdults = numberOfAdults;
    this.numberOfChildren = numberOfChildren;
    this.numberOfBabies = numberOfBabies;
    this.description = description;
  }
}

export class TicketCreateTravelDtoApi {
  @ApiProperty({ type: TicketTravelDetailsDto, required: false })
  'Demande Devis Omra'?: TicketTravelDetailsDto;
}
