import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('createBook')
  async createBook(@Body() createBookInput: CreateBookInput): Promise<Book> {
    return this.bookService.create(createBookInput);
  }

  @Get('findAllBooks')
  async findAllBooks(): Promise<Book[]> {
    return this.bookService.findAllBooks();
  }

  @Get('findOneBook/:BookId')
  async findOneBook(@Param('BookId') BookId: string): Promise<Book> {
    const book = await this.bookService.findOneBook(BookId);
    if (!book) {
      throw new NotFoundException(`Book with ID ${BookId} not found`);
    }
    return book;
  }

  @Patch('updateBook/:BookId')
  async updateBook(
    @Param('BookId') BookId: string,
    @Body() updateBookInput: UpdateBookInput,
  ): Promise<Book> {
    return await this.bookService.updateBook(BookId, updateBookInput);
  }

  @Delete('removeBook/:BookId')
  async removeBook(@Param('BookId') BookId: string): Promise<Book> {
    return await this.bookService.removeBook(BookId);
  }
}
