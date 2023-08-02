import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Book } from './book/entities/book.entity';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5439,
  username: 'flower',
  password: 'flower',
  database: 'graphQL-and-restAPI',
  entities: [Book],
  synchronize: true,
};

export default typeOrmConfig;
