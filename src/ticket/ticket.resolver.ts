import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseFilters, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/decorator/role.entity';
import { GQLRolesGuard } from 'src/guard/gql-role.guard';
import { SkipThrottle } from '@nestjs/throttler';
import { Ticket } from './ticket.schema';
import { TicketService } from './ticket.service';
import { CurrentUser } from 'src/decorator/user.entity';
import { UserEntity } from 'src/user/user.schema';
import { ErrorExceptionFilter } from 'src/filter/auth-exception.filter';

@Resolver(() => Ticket)
@UseFilters(new ErrorExceptionFilter())
export class TicketResolver {
  constructor(private ticketService: TicketService) {}

  @SkipThrottle()
  @Query(() => [Ticket])
  @Roles(UserRole.CLIENT)
  @UseGuards(GQLRolesGuard)
  async myTickets(@CurrentUser() user: UserEntity) {
    return this.ticketService.findAllById(user.id);
  }

  @SkipThrottle()
  @Query(() => [Ticket])
  @Roles(UserRole.ADMIN)
  @UseGuards(GQLRolesGuard)
  async ticketsByQuery(
    @Args('firstName', { nullable: true }) firstName?: string,
    @Args('lastName', { nullable: true }) lastName?: string,
    @Args('email', { nullable: true }) email?: string,
    @Args('ticketId', { nullable: true }) ticketId?: string,
  ) {
    return this.ticketService.findAllByQuery({
      firstName,
      lastName,
      email,
      ticketId,
    });
  }
}
