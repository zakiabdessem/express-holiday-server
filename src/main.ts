import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { urlencoded } from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'reflect-metadata';
import { ErrorExceptionFilter } from './filter/auth-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Express holiday API example')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const options = {
    origin: [
      'http://localhost:5173',
      'http://localhost:3001',
      'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Set-Cookie',
      'Cookie',
      'X-Requested-With',
    ],
  };

  app.enableCors(options);
  app.use(cookieParser());

  app.useBodyParser('json', { limit: '50mb' });

  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // Automatically remove any properties that are not part of the DTO
      forbidNonWhitelisted: true, // Optionally throw an error if extra properties are sent
    }),
  );

  app.useGlobalFilters(new ErrorExceptionFilter());

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
