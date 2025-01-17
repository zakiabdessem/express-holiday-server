import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';
import { UserRole } from 'src/decorator/role.entity';
import { Ticket } from 'src/ticket/ticket.schema';
import { Message } from 'src/chat/message.schema';

registerEnumType(UserRole, {
  name: 'UserRoles',
});

@ObjectType('User')
@Entity({
  name: 'users',
})
export class UserEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Column({ nullable: true })
  resetPasswordToken?: string;

  @Column('timestamp', { nullable: true })
  resetPasswordExpires?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  contactNumber?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: string[];

  @Field(() => [Message], {
    nullable: true,
  }) // Add this field
  @OneToMany(() => Message, (message) => message.sender, {
    nullable: true,
  })
  messages: Message[];

  @Field(() => UserRole)
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;
}
