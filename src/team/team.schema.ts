  import { Field, ID, ObjectType } from '@nestjs/graphql';
  import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
  import mongoose from 'mongoose';
  import { User } from 'src/user/user.schema';

  @ObjectType()
  export class Point {
    @Field(() => String)
    challengeId: string;

    @Field(() => Number)
    points: number;

    @Field(() => String, { nullable: true })
    submission_link?: string;
  }

  @ObjectType()
  @Schema({ timestamps: true })
  export class Team {
    @Field(() => ID, { nullable: true })
    _id?: string;

    @Field()
    @Prop({ required: true, unique: true })
    username: string;

    @Field()
    @Prop({ required: true })
    password: string;

    @Field()
    @Prop({ required: true, unique: true })
    name: string;

    @Field(() => String, { nullable: true })
    @Prop({
      type: String,
    })
    submission_link?: string;

    @Field(() => [Point], { nullable: true })
    @Prop({
      type: [
        {
          challengeId: { type: String },
          points: { type: Number, default: 0 },
          submission_link: { type: String },
        },
      ],
    })
    points?: {
      challengeId: string;
      points: number;
      submission_link?: string;
    }[];

    @Field(() => Number, { nullable: true })
    @Prop({ type: Number, default: 0 })
    total_points?: number;

    @Field(() => [User], { nullable: true })
    @Prop({
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    })
    teamMembers?: User[];
  }

  export const TeamSchema = SchemaFactory.createForClass(Team);
