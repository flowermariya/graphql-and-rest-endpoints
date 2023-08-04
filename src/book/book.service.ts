import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { IUser } from 'src/auth/guards/current-user.guard';
import { SortColumn, SortOrder } from 'src/enums/sort.enum';
import { EventEmitter } from 'events';

@Injectable()
export class BookService extends EventEmitter {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly userService: UserService,
  ) {
    super();
  }

  async create(user: IUser, createBookInput: CreateBookInput): Promise<Book> {
    try {
      const createdBook = await this.bookRepository.create({
        ...createBookInput,
        CreatedAt: new Date(),
      });

      const author = await this.userService.findOneUserById(user?.userId);

      createdBook.Owner = author;

      const savedBook = await this.bookRepository.save(createdBook);

      this.emit('CreateBook', savedBook);

      return savedBook;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllBooks(paginationAndSorting): Promise<Book[]> {
    try {
      const {
        limit = 5,
        sort_field = SortColumn.CREATED_AT,
        sort_order = SortOrder.DESC,
      } = paginationAndSorting;

      const allBooks = await this.bookRepository.find({
        order: { [sort_field]: sort_order },
        take: limit,
      });

      this.emit('FindAllBooks', allBooks);

      return allBooks;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

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

  async updateBook(
    user: IUser,
    BookId: string,
    updateBookInput: UpdateBookInput,
  ): Promise<Book> {
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

      const updatedBook = this.bookRepository.merge(
        existingBook,
        updateBookInput,
      );

      updatedBook.UpdatedAt = new Date();

      const updatedBookIs = await this.bookRepository.save(updatedBook);

      this.emit('UpdateBook', updatedBookIs);

      return updatedBookIs;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async removeBook(user: IUser, BookId: string): Promise<Book> {
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

      const deletedBook = Object.assign({}, existingBook);

      const deletedBookIs = this.bookRepository.delete(BookId);

      this.emit('DeleteBook', deletedBookIs);

      return deletedBook;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
