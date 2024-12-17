import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { compare, hash } from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';

import { Team } from './team.schema';
import { CreateTeamDto } from './dtos/team-create.dto';
import { UpdateTeamDto } from './dtos/team-update.dto';
import { SubmmisionTeamDto } from './dtos/team-submission.dto';
import { Request } from 'express';

@Injectable()
export class TeamService {
  constructor(@InjectModel(Team.name) private teamModel: Model<Team>) {}

  async deleteTeam(id: string): Promise<Team | null> {
    return await this.teamModel.findByIdAndDelete(id);
  }

  async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    const newUser = new this.teamModel(createTeamDto);
    await newUser.save();

    return newUser;
  }

  async updateTeam(
    id: string,
    updateTeamDto: Partial<UpdateTeamDto>,
  ): Promise<Team | null> {
    if (updateTeamDto.teamMembers) {
      for (const participantID of updateTeamDto.teamMembers) {
        const teamParticipantIsCurrentlyAssigned = await this.teamModel.findOne(
          {
            teamMembers: participantID,
            _id: { $ne: id },
          },
        );
        if (teamParticipantIsCurrentlyAssigned) {
          throw new Error(
            `Participant ${participantID} already assigned to another team`,
          );
        }
      }
    }

    return await this.teamModel.findByIdAndUpdate(id, updateTeamDto, {
      new: true,
    });
  }

  async pushParticipant(teamID: string, participantID: string) {
    const team = await this.teamModel.findById(teamID);
    if (!team) {
      throw new Error('Team not found');
    }

    const isAssigned = await this.teamModel.findOne({
      teamMembers: participantID,
    });
    if (isAssigned) {
      throw new Error('Participant already assigned to another team');
    }

    if (team.teamMembers.some((member) => member._id === participantID)) {
      throw new Error('Participant already assigned to this team');
    }

    return await this.teamModel.findOneAndUpdate(
      { _id: teamID },
      { $push: { teamMembers: participantID } },
      { new: true },
    );
  }

  async submission(
    req: Request,
    submissionTeamDto: Partial<SubmmisionTeamDto>,
  ): Promise<Team | null> {
    const decoded = req.decodedToken;

    return await this.teamModel.findByIdAndUpdate(
      decoded._id,
      {
        submission_link: submissionTeamDto.submission_link,
      },
      {
        new: true,
      },
    );
  }

  async findOne(): Promise<Team> {
    return await this.teamModel.findOne();
  }

  async findOneByName(name: string): Promise<Team | null> {
    return await this.teamModel.findOne({ name });
  }

  async findOneByUsername(username: string): Promise<Team | null> {
    return await this.teamModel.findOne({ username });
  }

  async findOneById(id: string): Promise<Team | null> {
    return await this.teamModel.findById(id);
  }

  async loginTeam(username: string, password: string): Promise<Team | null> {
    try {
      const team = await this.teamModel.findOne({ username });
      if (!team) return null;

      const isPasswordValid = await compare(password, team.password);

      if (!isPasswordValid) throw new Error('Invalid password');

      return team.toJSON() as Team;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Team[]> {
    try {
      return await this.teamModel
        .find()
        .populate(
          'teamMembers',
          'discordUsername email _id contactNumber name checkInDates',
        )
        .exec();
    } catch (error) {
      throw error;
    }
  }

  async findOneAndUpdate(teamId, toUpdate) {
    return await this.teamModel.findByIdAndUpdate(teamId, toUpdate);
  }
}
