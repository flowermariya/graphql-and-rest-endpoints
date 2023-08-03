import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { JwtAuthGuard } from 'src/auth/guards/auth.jwt.rest.guard';
import { CurrentUser, IUser } from 'src/auth/guards/current-user.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { PaginationAndSorting } from './dto/pagination-input';

@ApiTags('Resource - Book')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('createBook')
  @ApiOperation({ summary: 'Creates a new book entry in the database' })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
  })
  async createBook(
    @CurrentUser() user: IUser,
    @Body() createBookInput: CreateBookInput,
  ): Promise<Book> {
    console.log('>>user', user);
    return this.bookService.create(user, createBookInput);
  }

  @ApiOperation({ summary: 'Retrieves all the books from the database' })
  @ApiResponse({
    status: 201,
    description: 'All books Retrieved successfully.',
  })
  @Get('findAllBooks')
  async findAllBooks(
    @Query() paginationAndSorting: PaginationAndSorting,
  ): Promise<Book[]> {
    return this.bookService.findAllBooks(paginationAndSorting);
  }

  @ApiOperation({
    summary: 'Retrieves information for the book identified by the provided ID',
  })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully retrieved.',
  })
  @Get('findOneBook/:BookId')
  async findOneBook(@Param('BookId') BookId: string): Promise<Book> {
    const book = await this.bookService.findOneBook(BookId);
    if (!book) {
      throw new NotFoundException(`Book with ID ${BookId} not found`);
    }
    return book;
  }

  @ApiOperation({
    summary:
      'Updates the information for the book identified by the provided ID.',
  })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully updated.',
  })
  @Patch('updateBook/:BookId')
  async updateBook(
    @CurrentUser() user: IUser,
    @Param('BookId') BookId: string,
    @Body() updateBookInput: UpdateBookInput,
  ): Promise<Book> {
    return await this.bookService.updateBook(user, BookId, updateBookInput);
  }

  @ApiOperation({
    summary: 'Deletes the book identified by the provided ID from the database',
  })
  @ApiResponse({
    status: 201,
    description: 'The book has been deleted successfully.',
  })
  @Delete('removeBook/:BookId')
  async removeBook(
    @CurrentUser() user: IUser,
    @Param('BookId') BookId: string,
  ): Promise<Book> {
    return await this.bookService.removeBook(user, BookId);
  }
}
