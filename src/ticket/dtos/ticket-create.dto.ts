import { ObjectType } from '@nestjs/graphql';
import { Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

@ObjectType()
@Schema({ timestamps: true })
export class TicketCreateDto {
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
}
