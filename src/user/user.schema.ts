import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from 'src/decorator/role.entity';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  password: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field(() => String, { nullable: true })
  @Prop({
    type: String,
  })
  tShirtSize?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  profilePicture?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  contactNumber?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  discordUsername?: string;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String] })
  skills?: string[];

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  motivation?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  teamName?: string;

  @Field(() => Boolean, { nullable: true })
  @Prop({ type: Boolean })
  hasTeam?: boolean;

  @Field()
  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.PARTICIPANT,
  })
  role: UserRole;

  @Field()
  @Prop({
    type: String,
  })
  github?: string;

  @Field()
  @Prop({
    type: String,
  })
  linkedin?: string;

  @Field()
  @Prop({
    type: String,
  })
  portfolio?: string;

  @Field(() => Number, { defaultValue: 0 })
  @Prop({
    type: Number,
    default: 0,
  })
  points: number;

  //status filed
  @Field(() => String, { nullable: true })
  @Prop({
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  })
  status?: 'pending' | 'accepted' | 'rejected';

  @Field(() => [Date], { nullable: true })
  @Prop({ type: [Date], default: [] })
  checkInDates?: Date[];

  @Field(() => [Date], { nullable: true })
  @Prop({ type: [Date], default: [] })
  checkOutDates?: Date[];
}

export const UserSchema = SchemaFactory.createForClass(User);
