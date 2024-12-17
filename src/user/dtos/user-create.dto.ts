import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Validate,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { UserRole } from '../../decorator/role.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty({
    example: 'test@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'name',
    description: 'The name of the user',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiProperty({
    example: 'contactNumber',
    description: 'The Contact number of the user',
  })
  @IsString()
  contactNumber: string;

  @ApiProperty({
    example: 'Discord id',
    description: 'The Discord id of the user',
  })
  @IsString()
  discordUsername: string;

  @IsOptional()
  @ApiProperty({
    example: 'Skills',
    description: 'Array of Strings',
  })
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsOptional()
  @ApiProperty({
    example: 'Has team',
    description: 'Array of Strings',
  })
  @IsBoolean()
  @IsString({ each: true })
  hasTeam?: boolean;

  @IsOptional()
  @ApiProperty({
    example: 'Team Name',
    description: 'The team name',
  })
  @IsString({ each: true })
  teamName?: string;

  @IsOptional()
  @ApiProperty({
    example: 'Motivation',
    description: 'Motivation letter',
  })
  @IsString({ each: true })
  motivation?: string;

  @ApiProperty({
    example: 'tShirtSize',
    description: 'The tShirtSize XL | L | M | SM of the user',
  })
  @IsOptional()
  @IsString()
  tShirtSize?: string;

  @ApiProperty({
    example: 'role',
    description:
      'ADMIN = "admin", ORGANIZER = "organizer", PARTICIPANT = "participant"',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({
    example: 'gituhb',
    description: 'The github of the user',
  })
  @IsOptional()
  @IsString()
  github?: string;

  @ApiProperty({
    example: 'linkedin',
    description: 'The linkedin of the user',
  })
  @IsOptional()
  @IsString()
  linkedin?: string;

  @ApiProperty({
    example: 'portfolio',
    description: 'The portfolio of the user',
  })
  @IsOptional()
  @IsString()
  portfolio?: string;
}

export class ParticipantCreateDto {
  @ApiProperty({
    example: 'test@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'name',
    description: 'The name of the user',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiProperty({
    example: 'contactNumber',
    description: 'The Contact number of the user',
  })
  @IsString()
  contactNumber: string;

  @ApiProperty({
    example: 'Discord id',
    description: 'The Discord id of the user',
  })
  @IsString()
  discordUsername: string;

  @IsOptional()
  @ApiProperty({
    example: 'Skills',
    description: 'Array of Strings',
  })
  @IsArray()
  skills?: string[];

  @ApiProperty({
    example: 'Has team',
    description: 'Array of Strings',
  })
  @IsBoolean()
  hasTeam: boolean;

  @ApiProperty({
    example: 'Team Name',
    description: 'The team name',
  })
  @IsString({ each: true })
  teamName: string;

  @ApiProperty({
    example: 'Motivation',
    description: 'Motivation letter',
  })
  @IsString({ each: true })
  motivation: string;

  @ApiProperty({
    example: 'tShirtSize',
    description: 'The tShirtSize XL | L | M | SM of the user',
  })
  @IsString()
  tShirtSize: string;

  @ApiProperty({
    example: 'linkedin',
    description: 'The linkedin of the user',
  })
  @IsString()
  linkedin: string;

  @ApiProperty({
    example: 'portfolio',
    description: 'The portfolio of the user',
  })
  @IsString()
  portfolio?: string;
}
