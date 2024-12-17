import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  Req,
  Get,
  Logger,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import cookieConfig from '../config/cookie';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/decorator/role.entity';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dtos/team-create.dto';
import { UpdateTeamDto } from './dtos/team-update.dto';
import { AssignTeamDto } from './dtos/team-assign.dto';
import { GQLRolesGuard } from 'src/guard/gql-role.guard';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(GQLRolesGuard)
  @Post('register')
  async register(@Body() createUserDto: CreateTeamDto, @Res() res: Response) {
    try {
      const team = await this.teamService.createTeam(createUserDto);

      return res.status(HttpStatus.OK).json({
        message: 'Vous avez enregistré avec succes.',
        data: team,
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(GQLRolesGuard)
  @Put('participant/assign')
  async assignParticipant(
    @Body() assignTeamDto: AssignTeamDto,
    @Res() res: Response,
  ) {
    try {
      const team = await this.teamService.pushParticipant(
        assignTeamDto.team,
        assignTeamDto.participant,
      );

      return res.status(HttpStatus.OK).json({
        message: 'Vous avez enregistré avec succes.',
        data: team,
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
    }
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(GQLRolesGuard)
  @Put('')
  async updateTeam(@Body() editTeamDto: UpdateTeamDto, @Res() res: Response) {
    try {
      const team = await this.teamService.updateTeam(
        editTeamDto.id,
        editTeamDto,
      );

      return res.status(HttpStatus.OK).json({
        message: 'Vous avez enregistré avec succes.',
        data: team,
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
    }
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(GQLRolesGuard)
  @Delete('')
  async deleteTeam(@Body() editTeamDto: UpdateTeamDto, @Res() res: Response) {
    try {
      await this.teamService.deleteTeam(editTeamDto.id);

      return res.status(HttpStatus.OK).json({
        message: 'Vous avez enregistré avec succes.',
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(GQLRolesGuard)
  @Post('submit')
  async submission(
    @Body() editTeamDto: UpdateTeamDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const team = await this.teamService.submission(req, editTeamDto);

      return res.status(HttpStatus.OK).json({
        message: 'Vous avez enregistré avec succes.',
        data: team,
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  @Post('login')
  async login(
    @Body() { username, password }: { username: string; password: string },
    @Res() res: Response,
  ) {
    try {
      const team = await this.teamService.loginTeam(username, password);

      if (!team)
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Invalid credentials' });

      const token = await sign(team, process.env.SECRET);
      delete team.password;

      return res
        .cookie('jwt', token, cookieConfig())
        .status(HttpStatus.OK)
        .json({ message: 'Auth Success', token, team });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  @SkipThrottle()
  @Get('verify')
  async verify(@Req() req: Request, @Res() res: Response) {
    try {
      const decoded = req.decodedToken;

      const team = await this.teamService.findOneById(decoded._id);
      if (!team) return res.status(404).json({ auth: false });

      delete team.password;

      return res.status(HttpStatus.OK).json({ message: 'Auth Success', team });
    } catch (error) {
      Logger.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }
}
