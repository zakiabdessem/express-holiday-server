import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/decorator/role.entity';
import { GQLRolesGuard } from 'src/guard/gql-role.guard';
import { SkipThrottle } from '@nestjs/throttler';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @SkipThrottle()
  @Query(() => [User])
  @Roles(UserRole.ADMIN)
  @UseGuards(GQLRolesGuard)
  async users() {
    return this.userService.findAll();
  }

  @SkipThrottle()
  @Query(() => [User])
  @Roles(UserRole.ADMIN)
  @UseGuards(GQLRolesGuard)
  async participantsByStatus(
    @Args('participant_status') participant_status: string,
  ) {
    return this.userService.findAllParticipants(participant_status);
  }

  @SkipThrottle()
  @Query(() => [User])
  @Roles(UserRole.ADMIN)
  @UseGuards(GQLRolesGuard)
  async participants(@Args('query') query: string) {
    return this.userService.findAllByQuery(query);
  }
}
