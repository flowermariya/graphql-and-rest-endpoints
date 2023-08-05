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

  // Post API to create a new book
  @Post('createBoo k')
  @ApiOperation({ summary: 'Creates a new book entry in the database' })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
  })
  async createBook(
    @CurrentUser() user: IUser,
    @Body() createBookInput: CreateBookInput,
  ): Promise<Book> {
    return await this.bookService.create(user, createBookInput);
  }

  // Get API to retrieve all books
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

  // Get API to retrieve one book by ID
  @ApiOperation({
    summary: 'Retrieves information for the book identified by the provided ID',
  })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully retrieved.',
  })
  @Get('findOneBook')
  async findOneBook(@Query('BookId') BookId: string): Promise<Book> {
    const book = await this.bookService.findOneBook(BookId);
    if (!book) {
      throw new NotFoundException(`Book with ID ${BookId} not found`);
    }
    return book;
  }

  // Patch API to publish a book
  @ApiOperation({
    summary: 'Publishes the book identified by the provided ID.',
  })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully published.',
  })
  @Patch('publishBook')
  async publishBook(
    @CurrentUser() user: IUser,
    @Query('BookId') BookId: string,
  ): Promise<Book> {
    return await this.bookService.publishBook(user, BookId);
  }

  // Patch API to update a book
  @ApiOperation({
    summary:
      'Updates the information for the book identified by the provided ID.',
  })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully updated.',
  })
  @Patch('updateBook')
  async updateBook(
    @CurrentUser() user: IUser,
    @Query('BookId') BookId: string,
    @Body() updateBookInput: UpdateBookInput,
  ): Promise<Book> {
    return await this.bookService.updateBook(user, BookId, updateBookInput);
  }

  // Delete API to delete a book
  @ApiOperation({
    summary: 'Deletes the book identified by the provided ID from the database',
  })
  @ApiResponse({
    status: 201,
    description: 'The book has been deleted successfully.',
  })
  @Delete('removeBook')
  async removeBook(
    @CurrentUser() user: IUser,
    @Query('BookId') BookId: string,
  ) {
    return await this.bookService.removeBook(user, BookId);
  }
}
