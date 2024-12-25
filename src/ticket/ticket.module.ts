import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { Passenger, Ticket } from './ticket.schema';
import { TicketController } from './ticket.controller';
import { TicketResolver } from './ticket.resolver';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Passenger])],
  controllers: [TicketController],
  providers: [TicketService, TicketResolver],
  exports: [],
})
export class TicketModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
