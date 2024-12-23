import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './user.schema';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/decorator/role.entity';
import { GQLRolesGuard } from 'src/guard/gql-role.guard';
import { SkipThrottle } from '@nestjs/throttler';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private userService: UserService) {}

  @SkipThrottle()
  @Query(() => [UserEntity])
  @Roles(UserRole.ADMIN)
  @UseGuards(GQLRolesGuard)
  async users() {
    return this.userService.findAll();
  }

  @SkipThrottle()
  @Query(() => [UserEntity])
  @Roles(UserRole.ADMIN)
  @UseGuards(GQLRolesGuard)
  async usersByQuery(@Args('query') query: string) {
    return this.userService.findAllByQuery(query);
  }
}
