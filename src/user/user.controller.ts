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
  UseFilters,
} from '@nestjs/common';
import { UserCreateDto } from './dtos/user-create.dto';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import cookieConfig from '../config/cookie';
import { UserService } from './user.service';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/decorator/role.entity';
import { GQLRolesGuard } from 'src/guard/gql-role.guard';
import { SkipThrottle } from '@nestjs/throttler';
import { CurrentUser } from 'src/decorator/user.entity';
import { UserEntity } from './user.schema';
import { ResetPasswordDto } from './dtos/resetpassword.dto';
import { ErrorExceptionFilter } from 'src/filter/auth-exception.filter';

@Controller('user')
@UseFilters(new ErrorExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: UserCreateDto, @Res() res: Response) {
    try {
      await this.userService.createUserClient(createUserDto);

      return res.status(HttpStatus.OK).json({
        message: 'Vous avez enregistré avec succès.',
      });
    } catch (error) {
      console.log('🚀 ~ UserController ~ register ~ error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
    }
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(GQLRolesGuard)
  @Post('register/admin')
  async registerAdmin(
    @Body() createUserDto: UserCreateDto,
    @Res() res: Response,
  ) {
    try {
      return res.status(HttpStatus.OK).json({
        message: 'Vous avez enregistré avec succès.',
        data: await this.userService.createUserAdmin(createUserDto),
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
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

      const refresh_token = sign(
        {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          refresh: true,
        },
        process.env.SECRET,
        {
          expiresIn: '7d',
        },
      );

      const access_token = sign(
        {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          access: true,
        },
        process.env.SECRET,
        {
          expiresIn: '1h',
        },
      );

      delete user.password;

      return res
        .cookie(
          'refresh_token',
          refresh_token,
          cookieConfig(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
        )
        .cookie(
          'access_token',
          access_token,
          cookieConfig(new Date(Date.now() + 60 * 60 * 1000)),
        )
        .status(HttpStatus.OK)
        .json({
          message: 'Auth Success',
          refresh_token,
          access_token,
          user: {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
          },
        });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
    }
  }

  @SkipThrottle()
  @Get('verify')
  async verify(
    @CurrentUser() CurrentUser: UserEntity,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.findOneById(CurrentUser.id);
      if (!user) return res.status(404).json({ auth: false });

      delete user.password;

      const refresh_token = sign(
        {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          refresh: true,
        },
        process.env.SECRET,
        {
          expiresIn: '7d',
        },
      );

      const access_token = sign(
        {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          access: true,
        },
        process.env.SECRET,
        {
          expiresIn: '1h',
        },
      );

      return res
        .cookie(
          'refresh_token',
          refresh_token,
          cookieConfig(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
        )
        .cookie(
          'access_token',
          access_token,
          cookieConfig(new Date(Date.now() + 60 * 60 * 1000)),
        )
        .status(HttpStatus.OK)
        .json({
          message: 'Auth Success',
          refresh_token,
          access_token,
          user: {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
          },
        });
    } catch (error) {
      Logger.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
    }
  }

  @Post('forget-password')
  async forgetPassword(@Body('email') email: string, @Res() res: Response) {
    try {
      const user = await this.userService.findOneByEmail(email);
      console.log('🚀 ~ UserController ~ forgetPassword ~ user:', user);
      if (!user) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'User does not exist' });
      }

      // Generate a unique token for resetting password
      const resetToken = await this.userService.generateResetToken(user.id);

      // Send email using Resend API
      // Note: You have to configure your Resend API client here
      // See https://resend.com/docs/send-with-nodejs for more setup details
      await this.userService.sendResetPasswordEmail(email, resetToken);

      return res
        .status(HttpStatus.OK)
        .json({ message: 'Reset password email sent.' });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
    }
  }

  @Get('verify-token')
  async verifyToken(
    @Body()
    body: {
      email: string;
      token: string;
    },
    @Res() res: Response,
  ) {
    try {
      return res.status(HttpStatus.OK).json({
        valid: await this.userService.validateResetToken(
          body.email,
          body.token,
        ),
      });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
    }
  }

  @Post('reset-password')
  async resetPassword(
    @Body()
    resetPasswordDto: ResetPasswordDto,
    @Res() res: Response,
  ) {
    try {
      await this.userService.updatePassword(
        resetPasswordDto.token,
        resetPasswordDto.email,
        resetPasswordDto.password,
      );

      return res
        .status(HttpStatus.OK)
        .json({ message: 'Password reset successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      });
    }
  }
}
