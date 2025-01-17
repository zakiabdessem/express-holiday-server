import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/ticket/ticket.schema';
import { StatsController } from './statistics.controller';
import { TicketService } from 'src/ticket/ticket.service';
import { TicketModule } from 'src/ticket/ticket.module';
import { UserEntity } from 'src/user/user.schema';

@Module({
  imports: [TicketModule, TypeOrmModule.forFeature([Ticket, UserEntity])],
  controllers: [StatsController],
  providers: [TicketService],
})
export class StatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
