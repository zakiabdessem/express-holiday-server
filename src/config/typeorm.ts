import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { Message } from 'src/chat/message.schema';
import { Ticket } from 'src/ticket/ticket.schema';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  url: 'postgresql://postgres.fwtchkioczkjsofbbplc:gzQ8lge4pLpBm4iE@aws-0-eu-central-1.pooler.supabase.com:6543/postgres',

  //   host: `${process.env.DATABASE_HOST}`,
  //   port: `${process.env.DATABASE_PORT}`,
  //   username: `${process.env.DATABASE_USERNAME}`,
  //   password: `${process.env.DATABASE_PASSWORD}`,
  //   database: `${process.env.DATABASE_NAME}`,

  entities: ['dist/**/*.schema.js', Ticket, Message],
  migrations: ['dist/src/migrations/*.js'],
  autoLoadEntities: true,
  synchronize: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
