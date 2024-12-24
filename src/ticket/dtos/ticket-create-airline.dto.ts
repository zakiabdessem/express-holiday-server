import { ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsArray,
  IsEnum,
  isEnum,
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

enum TicketStatus {
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

@ObjectType()
@Schema({ timestamps: true })
export class TicketBillet1CreateDto {
  @ApiProperty({
    example: '1',
    description: 'Category of the ticket',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  category: number;

  @ApiProperty({
    example: '2',
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

  @IsNotEmpty()
  @IsEnum(TicketPriority)
  @ApiProperty({
    example: 'high',
    description: 'Priority of the ticket',
    enum: TicketPriority,
    required: true,
  })
  priority: string; //DIMA

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
}

@ObjectType()
@Schema({ timestamps: true })
export class TicketBillet2CreateDto {
  @ApiProperty({
    example: '1',
    description: 'Category of the ticket',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  category: number;

  @ApiProperty({
    example: '2',
    description: 'Subcategory of the ticket',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  subcategory: number;

  @IsNotEmpty()
  @IsEnum(TicketPriority)
  @ApiProperty({
    example: 'low',
    description: 'Priority of the ticket',
    enum: TicketPriority,
    required: true,
  })
  priority: TicketPriority; // Enum for ticket priority

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
  @ValidateNested({ each: true })
  @Type(() => PassengerDetailsDto) // Nested DTO for passenger details
  @MinLength(1)
  @MaxLength(99)
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
}

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
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  ticketNumber: string;
}
