// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { User } from 'src/user/user.schema';
// import { Ticket } from 'src/ticket/ticket.schema';

// @Module({
//   imports: [
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         type: 'postgres',
//         url: 'postgresql://postgres.fwtchkioczkjsofbbplc:gzQ8lge4pLpBm4iE@aws-0-eu-central-1.pooler.supabase.com:6543/postgres',
//         // host: configService.get<string>('databaseHost'),
//         // port: configService.get<number>('databasePort'),
//         // username: configService.get<string>('databaseUsername'),
//         // password: configService.get<string>('databasePassword'),
//         // database: configService.get<string>('databaseName'),
//         entities: [User, Ticket],
//       }),
//       inject: [ConfigService],
//     }),
//   ],
// })
// export class DatabaseModule {}
