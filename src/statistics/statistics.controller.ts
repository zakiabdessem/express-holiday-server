import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/decorator/role.entity';
import { Roles } from 'src/decorator/roles.decorator';
import { GQLRolesGuard } from 'src/guard/gql-role.guard';
import { TicketService } from 'src/ticket/ticket.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly ticketService: TicketService) {}

  @Get('tickets')
  @Roles(UserRole.ADMIN, UserRole.SUPERAGENT)
  @UseGuards(GQLRolesGuard)
  async getTicketStatistics() {
    const statusCounts = await this.ticketService.countTicketsByStatus();
    return statusCounts;
  }
}
