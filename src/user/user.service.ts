import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserEntity } from './user.schema';
import { UserCreateDto } from './dtos/user-create.dto';
import { compare, hash } from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { UserRole } from 'src/decorator/role.entity';
import { Resend } from 'resend';
import { randomBytes } from 'crypto';
import { addMinutes } from 'date-fns';
import * as bcrypt from 'bcrypt';
import { renderTemplate } from 'src/helpers/render-template.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

const resend = new Resend('re_Do5TxRpD_HdSQ79w4dct6opUTtRPMnLBb');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUserClient(createUserDto: UserCreateDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (user) {
      throw new Error('UserEntity already exists');
    }
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: createUserDto.password
        ? await hash(createUserDto.password, 10)
        : null,
      role: UserRole.CLIENT,
    });

    await this.userRepository.save(newUser);

    return newUser;
  }

  async createUserAdmin(createUserDto: UserCreateDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new Error('UserEntity already exists');
    }
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: await hash(createUserDto.password, 10),
      role: UserRole.ADMIN,
    });
    await this.userRepository.save(newUser);

    return newUser;
  }

  async generateResetToken(uid: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: {
        id: uid,
      },
    });

    if (!user) {
      throw new Error('UserEntity not found');
    }

    // Generate a secure token
    const resetToken = randomBytes(32).toString('hex');
    const tokenExpiry = addMinutes(new Date(), 30); // Token expires in 30 minutes

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = tokenExpiry;

    await this.userRepository.save(user);

    return resetToken;
  }

  async validateResetToken(email: string, token: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email: email },
      select: ['id', 'resetPasswordToken', 'resetPasswordExpires'],
    });

    if (
      !user ||
      !user.resetPasswordExpires ||
      new Date() > user.resetPasswordExpires ||
      token !== user.resetPasswordToken
    ) {
      return false;
    }

    return true;
  }

  async updatePassword(
    token: string,
    email: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.findOneByEmail(email);
    console.log('🚀 ~ UserService ~ user:', user);

    if (!(await this.validateResetToken(email, token))) {
      throw new Error('Token is invalid.');
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = null; // Remove the reset token
    user.resetPasswordExpires = null; // Clear the expiry

    await this.userRepository.save(user);
  }

  async sendResetPasswordEmail(email: string, resetToken: string) {
    const resetLink = `https://localhost:3000/reset-password?token=${resetToken}?email=${email}`;

    const htmlContent = renderTemplate('reset-password-email.hbs', {
      resetLink,
    });

    (async function () {
      const { data, error } = await resend.emails.send({
        from: 'Express holiday <onboarding@artican.org>',
        to: email,
        subject: 'Reset password express holiday',
        html: htmlContent,
      });

      if (error) {
        return console.error({ error });
      }

      console.log({ data });
    })();
  }

  // async findValidateToken(token: string) {
  //   const user = await this.userRepository.findOne({
  //     where: { resetPasswordToken: token },
  //     select: ['resetPasswordToken', 'resetPasswordExpires'],
  //   });

  //   if (
  //     !user ||
  //     !user.resetPasswordExpires ||
  //     new Date() > user.resetPasswordExpires ||
  //     token !== user.resetPasswordToken
  //   ) {
  //     return false;
  //   }

  //   return true;
  // }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findOneById(id: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async loginUser(email: string, password: string): Promise<UserEntity | null> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) return null;

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) throw new Error('Invalid password');

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOneAndUpdate(userId: string, toUpdate: Partial<UserEntity>) {
    await this.userRepository.update(userId, toUpdate);
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async findAllByQuery(queryText: string): Promise<UserEntity[]> {
    try {
      const query = [
        { first_name: Like(`%${queryText}%`) },
        { last_name: Like(`%${queryText}%`) },
        { contactNumber: Like(`%${queryText}%`) },
        { email: Like(`%${queryText}%`) },
      ];
      return await this.userRepository.find({ where: query });
    } catch (error) {
      throw new Error('Failed to fetch users by query: ' + error);
    }
  }
}
