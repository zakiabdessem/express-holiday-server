import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';
import { CategorySeeder } from './category/category.seed';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  console.log('Starting seeding...');
  const categorySeeder = new CategorySeeder();
  await categorySeeder.run(dataSource);
  console.log('Seeding completed');

  app.close();
}

bootstrap();
