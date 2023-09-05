import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { GqlAuthGuard } from 'src/auth/guards/auth.jwt.gql.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, IUser } from 'src/auth/guards/current-user.guard';
import { PaginationAndSorting } from './dto/pagination-input';

@UseGuards(GqlAuthGuard)
@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  // Mutation to create a new book
  @Mutation(() => Book)
  createBook(
    @CurrentUser() user: IUser,
    @Args('createBookInput') createBookInput: CreateBookInput,
  ): Promise<Book> {
    return this.bookService.create(user, createBookInput);
  }

  // Query to retrieve all books
  @Query(() => [Book])
  findAllBooks(
    @Args('paginationAndSorting', { nullable: true })
    paginationAndSorting: PaginationAndSorting,
  ): Promise<Book[]> {
    return this.bookService.findAllBooks(paginationAndSorting);
  }

  // Query to retrieve a book by its ID
  @Query(() => Book)
  findOneBook(@Args('BookId') BookId: string): Promise<Book> {
    return this.bookService.findOneBook(BookId);
  }

  // Mutation to publish a book
  @Mutation(() => Book)
  publishBook(
    @CurrentUser() user: IUser,
    @Args('BookId') BookId: string,
  ): Promise<Book> {
    return this.bookService.publishBook(user, BookId);
  }

  // Mutation to update a book
  @Mutation(() => Book)
  updateBook(
    @CurrentUser() user: IUser,
    @Args('BookId') BookId: string,
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
  ): Promise<Book> {
    return this.bookService.updateBook(user, BookId, updateBookInput);
  }

  // Mutation to remove a book
  @Mutation(() => String)
  removeBook(@CurrentUser() user: IUser, @Args('BookId') BookId: string) {
    return this.bookService.removeBook(user, BookId);
  }
}
