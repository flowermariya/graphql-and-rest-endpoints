import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Bookshelf Management API - Documentation')
  .setDescription(
    'This API allows users to manage a virtual bookshelf. Users can add, update, delete, and retrieve books. The API also supports user authentication and management',
  )
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth',
  )
  .build();
