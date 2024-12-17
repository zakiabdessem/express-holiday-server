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
  UseGuards,
} from '@nestjs/common';
import { ParticipantCreateDto, UserCreateDto } from './dtos/user-create.dto';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import cookieConfig from '../config/cookie';
import { UserService } from './user.service';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/decorator/role.entity';
import { UserEditDto } from './dtos/user-edit.dto';
import {
  ParticipantCheckinDto,
  ParticipantCheckoutDto,
} from './dtos/participant-checks.dto';
import { GQLRolesGuard } from 'src/guard/gql-role.guard';
import { SkipThrottle } from '@nestjs/throttler';
import { CurrentUser } from 'src/decorator/user.entity';
import { User } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register/participant')
  async register(
    @Body() createUserDto: ParticipantCreateDto,
    @Res() res: Response,
  ) {
    try {
      await this.userService.createUserParticipant(createUserDto);

      return res.status(HttpStatus.OK).json({
        message: 'Vous avez enregistré avec succès.',
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(GQLRolesGuard)
  @Post('register/organizer')
  async registerClient(
    @Body() createUserDto: UserCreateDto,
    @Res() res: Response,
  ) {
    try {
      const organizer =
        await this.userService.createUserOrganizer(createUserDto);

      return res.status(HttpStatus.OK).json({
        message: 'Vous avez enregistré avec succès.',
        data: organizer,
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
    }
  }

  @Roles(UserRole.ADMIN, UserRole.ORGANIZER)
  @UseGuards(GQLRolesGuard)
  @Put('participant')
  async updateParticipant(
    @Body() editUserDto: UserEditDto,
    @Res() res: Response,
  ) {
    try {
      await this.userService.editParticipant(editUserDto);

      return res.status(HttpStatus.OK).json({
        message: 'Vous avez enregistré avec succès.',
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  @Roles(UserRole.ORGANIZER)
  @UseGuards(GQLRolesGuard)
  @Post('participant')
  async participant(
    @Body()
    body: {
      id: string;
    },
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.findOneById(body.id);

      return res.status(HttpStatus.OK).json({
        message: 'Vous avez enregistré avec succès.',
        data: user,
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  @SkipThrottle()
  @Roles(UserRole.ADMIN, UserRole.ORGANIZER)
  @UseGuards(GQLRolesGuard)
  @Put('checkin')
  async checkinParticipant(
    @Body() participantCheckinDto: ParticipantCheckinDto,
    @Res() res: Response,
  ) {
    try {
      const participant = await this.userService.checkinParticipant(
        participantCheckinDto,
        res,
      );

      return res.status(HttpStatus.OK).json({
        message: 'Checkin succès.',
        participant,
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  @SkipThrottle()
  @Roles(UserRole.ORGANIZER)
  @UseGuards(GQLRolesGuard)
  @Put('checkout')
  async checkoutParticipant(
    @Body() participantCheckoutDto: ParticipantCheckoutDto,
    @Res() res: Response,
  ) {
    try {
      const participant = await this.userService.checkoutParticipant(
        participantCheckoutDto,
      );

      return res.status(HttpStatus.OK).json({
        message: 'Checkout succès.',
        participant,
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
    @Body() { email, password }: { email: string; password: string },
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.loginUser(email, password);

      if (!user)
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Invalid credentials' });

      const token = await sign(
        {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        process.env.SECRET,
      );
      delete user.password;

      return res
        .cookie('jwt', token, cookieConfig())
        .status(HttpStatus.OK)
        .json({
          message: 'Auth Success',
          token,
          user: {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        });
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
  async verify(
    @CurrentUser() CurrentUser: User,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.findOneById(CurrentUser._id);
      if (!user) return res.status(404).json({ auth: false });

      delete user.password;

      return res.status(HttpStatus.OK).json({ message: 'Auth Success', user });
    } catch (error) {
      Logger.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }
}
