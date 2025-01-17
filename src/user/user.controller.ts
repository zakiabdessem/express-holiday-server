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
  HttpException,
} from '@nestjs/common';
import { UserCreateDto } from './dtos/user-create.dto';
import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
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
import { QueryFailedError } from 'typeorm';

@Controller('user')
@UseFilters(new ErrorExceptionFilter())
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: UserCreateDto, @Res() res: Response) {
    try {
      await this.userService.createUserClient(createUserDto);

      return res.status(HttpStatus.OK).json({
        message: 'Vous avez enregistré avec succès.',
      });
    } catch (error) {
      this.logger.error('Error in register', error.stack);

      if (error instanceof QueryFailedError) {
        return res.status(HttpStatus.BAD_GATEWAY).json({
          statusCode: HttpStatus.BAD_GATEWAY,
          message: 'Database connection error: ' + error.message,
        });
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Internal server error',
        });
      }
    }
  }

  @Post('register/admin')
  async registerAdmin(
    @Body() createUserDto: UserCreateDto,
    @Res() res: Response,
  ) {
    try {
      await this.userService.createUserAdmin(createUserDto);

      return res.status(HttpStatus.OK).json({
        message: 'Vous avez enregistré avec succès.',
      });
    } catch (error) {
      this.logger.error('Error in registerAdmin', error.stack);

      if (error instanceof QueryFailedError) {
        return res.status(HttpStatus.BAD_GATEWAY).json({
          statusCode: HttpStatus.BAD_GATEWAY,
          message: 'Database connection error: ' + error.message,
        });
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Internal server error',
        });
      }
    }
  }

  @Post('login')
  async login(
    @Body() { email, password }: { email: string; password: string },
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.loginUser(email, password);

      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Invalid credentials',
        });
      }

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
      this.logger.error('Error in login', error.stack);

      if (error instanceof QueryFailedError) {
        return res.status(HttpStatus.BAD_GATEWAY).json({
          statusCode: HttpStatus.BAD_GATEWAY,
          message: 'Database connection error: ' + error.message,
        });
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.BAD_GATEWAY,
          message: error.message || 'Internal server error',
        });
      }
    }
  }

  @SkipThrottle()
  @Post('verify')
  async verify(
    @Body() { token }: { token: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      if (!token) {
        throw new HttpException(
          {
            message: 'No Refresh token found.',
            customCode: 'REFRESH_TOKEN_MISSING',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const decoded = verify(token, process.env.SECRET) as UserEntity;

      const user = await this.userService.findOneById(decoded.id);

      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({ auth: false });
      }

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
      this.logger.error('Error in verify', error.stack);

      if (error instanceof QueryFailedError) {
        return res.status(HttpStatus.BAD_GATEWAY).json({
          statusCode: HttpStatus.BAD_GATEWAY,
          message: 'Database connection error: ' + error.message,
        });
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Internal server error',
        });
      }
    }
  }

  @Post('forget-password')
  async forgetPassword(@Body('email') email: string, @Res() res: Response) {
    try {
      const user = await this.userService.findOneByEmail(email);
      if (!user) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'User does not exist' });
      }

      const resetToken = await this.userService.generateResetToken(user.id);

      await this.userService.sendResetPasswordEmail(email, resetToken);

      return res
        .status(HttpStatus.OK)
        .json({ message: 'Reset password email sent.' });
    } catch (error) {
      this.logger.error('Error in forgetPassword', error.stack);

      if (error instanceof QueryFailedError) {
        return res.status(HttpStatus.BAD_GATEWAY).json({
          statusCode: HttpStatus.BAD_GATEWAY,
          message: 'Database connection error: ' + error.message,
        });
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Internal server error',
        });
      }
    }
  }

  @Get('verify-token')
  async verifyToken(
    @Body() body: { email: string; token: string },
    @Res() res: Response,
  ) {
    try {
      const isValid = await this.userService.validateResetToken(
        body.email,
        body.token,
      );

      return res.status(HttpStatus.OK).json({ valid: isValid });
    } catch (error) {
      this.logger.error('Error in verifyToken', error.stack);

      if (error instanceof QueryFailedError) {
        return res.status(HttpStatus.BAD_GATEWAY).json({
          statusCode: HttpStatus.BAD_GATEWAY,
          message: 'Database connection error: ' + error.message,
        });
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Internal server error',
        });
      }
    }
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
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
      this.logger.error('Error in resetPassword', error.stack);

      if (error instanceof QueryFailedError) {
        return res.status(HttpStatus.BAD_GATEWAY).json({
          statusCode: HttpStatus.BAD_GATEWAY,
          message: 'Database connection error: ' + error.message,
        });
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Internal server error',
        });
      }
    }
  }
}
