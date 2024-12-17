import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNumber,
  IsNotEmpty,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserEditDto } from 'src/user/dtos/user-edit.dto';

class UpdatePointDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'challenge123',
    description: 'The unique ID of the challenge',
  })
  challengeId?: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 10,
    description: 'The number of points awarded for the challenge',
  })
  points?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'http://example.com/submission',
    description: 'Link to the challenge submission',
  })
  submission_link?: string;
}


class TeamMembreEditDto {
  @IsNotEmpty()
  @IsString()
  _id?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  contactNumber?: string;

  @IsOptional()
  @IsString()
  discordUsername?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsOptional()
  @IsString()
  tShirtSize?: string;

  @IsOptional()
  @IsString()
  github?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

  @IsOptional()
  @IsString()
  portfolio?: string;

  @IsOptional()
  @IsEnum(['pending', 'accepted', 'rejected'])
  status?: 'pending' | 'accepted' | 'rejected';
}

export class UpdateTeamDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'id',
    description: 'id of the team, must be valide',
  })
  id: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'teamXupdate',
    description: 'New username for the team, must be unique',
  })
  username?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'newstrongpassword',
    description: 'New password for the team',
  })
  password?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'The New Champions',
    description: 'New name of the team',
  })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'http://example.com/newsubmissionlink',
    description: 'Updated general submission link for the team',
  })
  submission_link?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdatePointDto)
  @ApiPropertyOptional({
    type: [UpdatePointDto],
    description:
      'Updated array of points awarded to the team for various challenges',
  })
  points?: UpdatePointDto[];

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 50,
    description: 'Updated total points accumulated by the team',
  })
  total_points?: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TeamMembreEditDto)
  @ApiPropertyOptional({
    type: [TeamMembreEditDto],
    description: 'Updated array of team members',
  })
  teamMembers?: TeamMembreEditDto[];
}



