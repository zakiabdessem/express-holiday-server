import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsMobilePhone,
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
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'first name',
    description: 'The first name of the user',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: 'last name',
    description: 'The last name of the user',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiProperty({
    example: '+213123456789',
    description: 'The Contact number of the user',
  })
  @IsMobilePhone('ar-DZ')
  contactNumber: string;

  @ApiProperty({
    example: 'role',
    description: 'ADMIN = "admin", CLIENT = "client"',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
