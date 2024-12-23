import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { Ticket } from './ticket.schema';
import { TicketController } from './ticket.controller';
import { TicketResolver } from './ticket.resolver';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [TicketController],
  providers: [TicketService, TicketResolver],
  exports: [],
})
export class TicketModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
