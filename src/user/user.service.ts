import { HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UserCreateDto } from './dtos/user-create.dto';
import { compare, hash } from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { UserRole } from 'src/decorator/role.entity';
import { UserEditDto } from './dtos/user-edit.dto';
import {
  ParticipantCheckinDto,
  ParticipantCheckoutDto,
} from './dtos/participant-checks.dto';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUserParticipant(createUserDto: UserCreateDto): Promise<User> {
    //check if user exits first if yes throw erro
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new Error('User already exists');
    }
    const newUser = new this.userModel({
      ...createUserDto,
      password: createUserDto.password
        ? await hash(createUserDto.password, 10)
        : null,
      status: 'pending',
      role: UserRole.PARTICIPANT,
    });
    await newUser.save();

    return newUser;
  }

  async createUserOrganizer(createUserDto: UserCreateDto): Promise<User> {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new Error('User already exists');
    }
    const newUser = new this.userModel({
      ...createUserDto,
      password: await hash(createUserDto.password, 10),
      role: UserRole.ORGANIZER,
    });
    await newUser.save();

    return newUser;
  }

  async editParticipant(editUserDto: UserEditDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      editUserDto.id,
      editUserDto,
    );

    if (!updatedUser) throw new Error('No user found');

    return updatedUser;
  }

  async checkinParticipant(
    participantCheckinDto: ParticipantCheckinDto,
    res: Response,
  ) {
    const participant = await this.userModel.findById(participantCheckinDto.id);

    if (!participant) throw new Error('No user found');

    if (participant.status !== 'accepted')
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'User not accepted (Check admin dashboard).',
      });

    //TODO: CHECK last check in date need to be atleast more than 1 hour
    const last_checkin =
      participant.checkInDates[participant.checkInDates.length - 1];

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    console.log(
      '🚀 ~ UserService ~ new Date(last_checkin) > oneHourAgo:',
      new Date(last_checkin),
    );

    if (last_checkin) {
      if (new Date(last_checkin) > oneHourAgo) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Check-in not allowed within one hour of the last check-in.',
        });
      }
    }

    const now = new Date();

    participant.checkInDates.push(now);

    await participant.save();

    return participant;
  }

  async checkoutParticipant(participantCheckoutDto: ParticipantCheckoutDto) {
    const participant = await this.userModel.findById(
      participantCheckoutDto.id,
    );

    if (!participant) throw new Error('No user found');

    const now = new Date();

    participant.checkOutDates.push(now);

    await participant.save();

    return participant;
  }

  async findOne(): Promise<User> {
    return await this.userModel.findOne();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email });
  }

  async findOneById(id: string): Promise<User | null> {
    return await this.userModel.findById(id);
  }

  async loginUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) return null;

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) throw new Error('Invalid password');

      return user.toJSON() as User;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw error;
    }
  }

  async findAllParticipants(participant_status: string): Promise<User[]> {
    try {
      return await this.userModel
        .find({
          role: 'participant',
          status: participant_status,
        })
        .exec();
    } catch (error) {
      throw error;
    }
  }

  async findOneAndUpdate(userId, toUpdate) {
    return await this.userModel.findByIdAndUpdate(userId, toUpdate);
  }

  async findAllByQuery(queryText: string): Promise<User[]> {
    try {
      const query = {
        $or: [
          { name: new RegExp(queryText, 'i') },
          { contactNumber: new RegExp(queryText, 'i') },
          { email: new RegExp(queryText, 'i') },
        ],
      };
      return await this.userModel.find(query).exec();
    } catch (error) {
      throw new Error('Failed to fetch users by query: ' + error);
    }
  }
}
