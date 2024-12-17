import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { AuthMiddleware } from 'middleware/auth.middleware';
import { Team, TeamSchema } from './team.schema';
import { TeamResolver } from './team.resolver';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
  ],
  controllers: [TeamController],
  providers: [TeamService, TeamResolver],
  exports: [TeamService],
})
export class TeamModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
