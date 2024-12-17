import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AssignTeamDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Participant ID',
    description: 'Participant to assign.',
  })
  participant: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Team ID',
    description: 'ID of the team to assign the participant to.',
  })
  team: string;
}
