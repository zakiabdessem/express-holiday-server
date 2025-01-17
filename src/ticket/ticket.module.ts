import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Passenger, Ticket } from './ticket.schema';
import { TicketController } from './ticket.controller';
import { TicketResolver } from './ticket.resolver';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Passenger, UserEntity])],
  controllers: [TicketController],
  providers: [TicketService, TicketResolver],
  exports: [TicketService],
})
export class TicketModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
