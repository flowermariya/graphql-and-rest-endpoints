import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  createBook(
    @Args('createBookInput') createBookInput: CreateBookInput,
  ): Promise<Book> {
    return this.bookService.create(createBookInput);
  }

  @Query(() => [Book])
  findAllBooks(): Promise<Book[]> {
    return this.bookService.findAllBooks();
  }

  @Query(() => Book)
  findOneBook(@Args('BookId') BookId: string): Promise<Book> {
    return this.bookService.findOneBook(BookId);
  }

  @Mutation(() => Book)
  updateBook(
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
  ): Promise<Book> {
    return this.bookService.updateBook(updateBookInput);
  }

  @Mutation(() => Book)
  removeBook(@Args('BookId') BookId: string): Promise<Book> {
    return this.bookService.removeBook(BookId);
  }
}
