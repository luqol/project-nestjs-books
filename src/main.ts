import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes( new ValidationPipe( { transform: true}));
  app.setGlobalPrefix('api');
  await app.enableShutdownHooks();
  app.use(cookieParser());
  await app.listen(configService.get('port'));
}
bootstrap();
