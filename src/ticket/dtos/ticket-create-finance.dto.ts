import { ApiProperty } from '@nestjs/swagger';
import {
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

export class TicketFinance1Dto {
  @ApiProperty({
    example: '1',
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
    example: 'Janvier 2023',
    description: 'Période de réclamation',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  period: string;

  @ApiProperty({
    example: 'INV123456',
    description: 'Numéro de la facture',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  invoiceNumber: string;

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
    period: string,
    invoiceNumber: string,
    description: string,
  ) {
    this.subject = subject;
    this.period = period;
    this.invoiceNumber = invoiceNumber;
    this.description = description;
  }
}

export class TicketFinance2Dto {
  @ApiProperty({
    example: '2',
    description: 'Subcategory of the ticket',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  subcategory: number;

  @ApiProperty({
    example: 'Janvier 2023',
    description: 'Période du règlement',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  period: string;

  @ApiProperty({
    example: 1000,
    description: 'Montant du règlement',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: 'INV123456',
    description: 'Numéro de la facture',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  invoiceNumber: string;

  @ApiProperty({
    example: 'Detailed description of the payment here...',
    description: 'Description du règlement',
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
    period: string,
    amount: number,
    invoiceNumber: string,
    description: string,
  ) {
    this.period = period;
    this.amount = amount;
    this.invoiceNumber = invoiceNumber;
    this.description = description;
  }
}

export class TicketFinance3Dto {
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
    example: 'Janvier 2023',
    description: 'Période de réclamation',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  period: string;

  @ApiProperty({
    example: 'INV123456',
    description: 'Numéro de la facture',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  invoiceNumber: string;

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
    period: string,
    invoiceNumber: string,
    description: string,
  ) {
    this.subject = subject;
    this.period = period;
    this.invoiceNumber = invoiceNumber;
    this.description = description;
  }
}

export class TicketCreateFinanceDtoApi {
  @ApiProperty({ type: TicketFinance1Dto, required: false })
  'Demande Du Solde Virtuel'?: TicketFinance1Dto;

  @ApiProperty({ type: TicketFinance2Dto, required: false })
  'Ajout D un Règlement'?: TicketFinance2Dto;

  @ApiProperty({ type: TicketFinance3Dto, required: false })
  'Réclamations Au Service Finance'?: TicketFinance3Dto;
}
