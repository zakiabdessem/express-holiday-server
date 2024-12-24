import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/decorator/role.entity';
import { GQLRolesGuard } from 'src/guard/gql-role.guard';
import { SkipThrottle } from '@nestjs/throttler';
import { Ticket } from './ticket.schema';
import { TicketService } from './ticket.service';

@Resolver(() => Ticket)
export class TicketResolver {
  constructor(private ticketService: TicketService) {}

  @SkipThrottle()
  @Query(() => [Ticket])
  async tickets() {
    return this.ticketService.findAll();
  }

  // @SkipThrottle()
  // @Query(() => [Ticket])
  // @Roles(UserRole.ADMIN)
  // @UseGuards(GQLRolesGuard)
  // async ticketsByQuery(@Args('query') query: string) {
  //   return this.ticketService.findAllByQuery(query);
  // }
}
