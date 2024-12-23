import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    example: '1234567890abcdef',
    description: 'The reset token',
  })
  @IsString()
  token: string;

  @ApiProperty({
    example: 'test@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'newpassword123',
    description: 'The new password',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
