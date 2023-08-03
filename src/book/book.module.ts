import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [BookResolver, BookService],
  controllers: [BookController],
  imports: [TypeOrmModule.forFeature([Book]), AuthModule],
})
export class BookModule {}
