import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum TicketStatus {
  INPROGRESS = 'inprogress',
  CLOSED = 'closed',
  OPEN = 'open',
}

@ObjectType()
@Schema({ timestamps: true })
export class TicketCreateDto {
  @ApiProperty({
    example: 'Issue',
    description: 'Category of the ticket',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    example: 'Issue description here',
    description: 'Detailed description of the issue',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'John',
    description: 'First name of the ticket creator',
    required: true,
  })
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the ticket creator',
    required: true,
  })
  last_name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'More info needed',
    description: 'The reason for the ticket status',
    required: false,
  })
  reason?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'PNRXYZ123',
    description: 'PNR (Passenger Name Record)',
    required: false,
  })
  pnr?: string;
}

export const TicketSchema = SchemaFactory.createForClass(TicketCreateDto);
