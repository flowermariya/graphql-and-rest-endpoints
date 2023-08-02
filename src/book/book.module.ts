import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';

@Module({
  providers: [BookResolver, BookService],
  controllers: [BookController],
  imports: [TypeOrmModule.forFeature([Book])],
})
export class BookModule {}
