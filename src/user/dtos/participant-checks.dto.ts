import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ParticipantCheckinDto {
  @ApiProperty({
    example: '674628a53365c6a0d0a70b3f',
    description: 'The id of the user',
  })
  @IsNotEmpty()
  @IsString()
  id?: string;
}

export class ParticipantCheckoutDto {
  @ApiProperty({
    example: '674628a53365c6a0d0a70b3f',
    description: 'The id of the user',
  })
  @IsNotEmpty()
  @IsString()
  id?: string;
}
