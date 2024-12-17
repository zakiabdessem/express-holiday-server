import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/decorator/role.entity';
import { Team } from './team.schema';
import { TeamService } from './team.service';
import { GQLRolesGuard } from 'src/guard/gql-role.guard';
import { SkipThrottle } from '@nestjs/throttler';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private teamService: TeamService) {}

  @SkipThrottle()
  @Query(() => [Team])
  @Roles(UserRole.ADMIN)
  @UseGuards(GQLRolesGuard)
  async teams() {
    return await this.teamService.findAll();
  }
}
