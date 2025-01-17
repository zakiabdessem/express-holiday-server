import { Controller, Get } from '@nestjs/common';
import { TicketService } from 'src/ticket/ticket.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly ticketService: TicketService) {}

  @Get('tickets')
  async getTicketStatistics() {
    const statusCounts = await this.ticketService.countTicketsByStatus();
    return statusCounts;
  }
}
