import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Book } from './book/entities/book.entity';
import { User } from './user/entities/user.entity';
import { Auth } from './auth/entities/auth.entity';
import { RefreshToken } from './auth/entities/refresh-token.entinty';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5439,
  username: 'flower',
  password: 'flower',
  database: 'graphQL-and-restAPI',
  entities: [Book, User, Auth, RefreshToken],
  synchronize: true,
};

export default typeOrmConfig;
