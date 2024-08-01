import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(process.env.APP_PORT);

  const appURL = await app.getUrl();

  Logger.log(`${process.env.APP_NAME} ${appURL} on ${process.env.APP_PORT}`);
}
bootstrap();
