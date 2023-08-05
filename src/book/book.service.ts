import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { IUser } from 'src/auth/guards/current-user.guard';
import { SortColumn, SortOrder } from 'src/utils/enums/sort.enum';
import { EventEmitter } from 'events';
import { PaginationAndSorting } from './dto/pagination-input';

@Injectable()
export class BookService extends EventEmitter {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly userService: UserService,
  ) {
    super();
  }

  // To create a new book
  async create(user: IUser, createBookInput: CreateBookInput): Promise<Book> {
    try {
      if (Object.keys(createBookInput).length === 0) {
        throw new Error('No data found to update');
      }

      const createdBook = await this.bookRepository.create({
        ...createBookInput,
        CreatedAt: new Date(),
      });

      const author = await this.userService.findOneUserById(user?.userId);

      createdBook.Owner = author;

      const savedBook = await this.bookRepository.save(createdBook);

      // Emits an event when create a new book
      this.emit('CreateBook', savedBook);

      return savedBook;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // To retrieve all books
  async findAllBooks(
    paginationAndSorting: PaginationAndSorting,
  ): Promise<Book[]> {
    try {
      const {
        limit = 5,
        sort_field = SortColumn.CREATED_AT,
        sort_order = SortOrder.DESC,
        isPublished = false,
      } = paginationAndSorting;

      const allBooks = await this.bookRepository.find({
        where: { IsPublished: isPublished },
        order: { [sort_field]: sort_order },
        take: limit,
        relations: ['Owner'],
      });

      return allBooks;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // To retrieve a book by ID
  async findOneBook(BookId: string): Promise<Book> {
    try {
      return await this.bookRepository.findOne({
        where: { BookId },
        relations: { Owner: true },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // To publish a book
  async publishBook(user: IUser, BookId: string): Promise<Book> {
    try {
      const existingBook = await this.findOneBook(BookId);

      if (existingBook?.Owner?.UserId !== user?.userId) {
        throw new HttpException(
          `You are not authorized to update this book, since you are not the author of this book`,
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (!existingBook) {
        throw new HttpException(
          `Book with ${BookId} not found to delete`,
          HttpStatus.NOT_FOUND,
        );
      }

      existingBook.IsPublished = true;
      existingBook.PublishedOn = new Date();
      existingBook.UpdatedAt = new Date();

      const publishedBook = await this.bookRepository.save(existingBook);

      return publishedBook;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // To update a book
  async updateBook(
    user: IUser,
    BookId: string,
    updateBookInput: UpdateBookInput,
  ): Promise<Book> {
    try {
      if (Object.keys(updateBookInput).length === 0) {
        throw new Error('No data found to update');
      }

      const existingBook = await this.findOneBook(BookId);

      if (existingBook?.Owner?.UserId !== user?.userId) {
        throw new HttpException(
          `You are not authorized to update this book, since you are not the author of this book`,
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (!existingBook) {
        throw new HttpException(
          `Book with ${BookId} not found to delete`,
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedBook = this.bookRepository.merge(
        existingBook,
        updateBookInput,
      );

      updatedBook.UpdatedAt = new Date();

      const updatedBookIs = await this.bookRepository.save(updatedBook);

      // Emits an event when update a book
      this.emit('UpdateBook', updatedBookIs);

      return updatedBookIs;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // To delete a book
  async removeBook(user: IUser, BookId: string) {
    try {
      const existingBook = await this.findOneBook(BookId);

      if (!existingBook) {
        throw new HttpException(
          `Book with ${BookId} not found to delete`,
          HttpStatus.NOT_FOUND,
        );
      }

      if (existingBook?.Owner?.UserId !== user?.userId) {
        throw new HttpException(
          `You are not authorized to update this book, since you are not the author of this book`,
          HttpStatus.UNAUTHORIZED,
        );
      }

      const deletedBookIs = this.bookRepository.delete(BookId);

      // Emits an event when delete a book
      this.emit('DeleteBook', deletedBookIs);

      return 'Book deleted successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
