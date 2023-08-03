import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { JwtAuthGuard } from 'src/auth/guards/auth.jwt.rest.guard';
import { CurrentUser, IUser } from 'src/auth/guards/current-user.guard';

@UseGuards(JwtAuthGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('createBook')
  async createBook(
    @CurrentUser() user: IUser,
    @Body() createBookInput: CreateBookInput,
  ): Promise<Book> {
    console.log('>>user', user);
    return this.bookService.create(user, createBookInput);
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
    @CurrentUser() user: IUser,
    @Param('BookId') BookId: string,
    @Body() updateBookInput: UpdateBookInput,
  ): Promise<Book> {
    return await this.bookService.updateBook(user, BookId, updateBookInput);
  }

  @Delete('removeBook/:BookId')
  async removeBook(
    @CurrentUser() user: IUser,
    @Param('BookId') BookId: string,
  ): Promise<Book> {
    return await this.bookService.removeBook(user, BookId);
  }
}
