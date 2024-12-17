import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class PointDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'challenge123',
    description: 'The unique ID of the challenge',
  })
  challengeId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 10,
    description: 'The number of points awarded for the challenge',
  })
  points: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'http://example.com/submission',
    description: 'Link to the challenge submission',
    required: false,
  })
  submission_link?: string;
}

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'teamX',
    description: 'Username for the team, must be unique',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'strongpassword',
    description: 'Password for the team',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'The Champions',
    description: 'Name of the team',
  })
  name: string;
  
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'http://example.com/submissionlink',
    description: 'General submission link for the team',
    required: false
  })
  submission_link?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PointDto)
  @ApiProperty({
    type: [PointDto],
    description: 'Array of points awarded to the team for various challenges',
    required: false
  })
  points?: PointDto[];

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 50,
    description: 'Total points accumulated by the team',
    required: false
  })
  total_points?: number;
}

