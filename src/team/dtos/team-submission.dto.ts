import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsUrl,
} from 'class-validator';

export class SubmmisionTeamDto {
  @IsString()
  @IsUrl()
  @ApiPropertyOptional({
    example: 'http://example.com/newsubmissionlink',
    description:
      'Submission general submission link for the team when hackathon is done',
  })
  submission_link?: string;
}
