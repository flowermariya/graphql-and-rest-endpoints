import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Book } from './book/entities/book.entity';
import { User } from './user/entities/user.entity';
import { RefreshToken } from './auth/entities/refresh-token.entinty';
import { Module } from '@nestjs/common';
require('dotenv').config();

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  entities: [Book, User, RefreshToken],
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [],
  providers: [],
})
export class TypeOrmConfigModule {}
