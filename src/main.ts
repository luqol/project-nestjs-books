import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe( { transform: true}));
  app.setGlobalPrefix('api');
  await app.enableShutdownHooks();
  app.use(cookieParser());
  await app.listen(8000);
}
bootstrap();
