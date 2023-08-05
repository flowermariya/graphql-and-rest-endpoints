import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from './auth/configs/swagger.config';
import { ValidationPipe } from '@nestjs/common';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
  console.log(`Server is running in ${process.env.PORT}`);
}

bootstrap();
