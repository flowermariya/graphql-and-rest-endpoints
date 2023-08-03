import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { IUser } from 'src/auth/guards/current-user.guard';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly userService: UserService,
  ) {}

  async create(user: IUser, createBookInput: CreateBookInput): Promise<Book> {
    try {
      console.log('user', user);

      const createdBook = await this.bookRepository.create({
        ...createBookInput,
        CreatedAt: new Date(),
      });

      const author = await this.userService.findOneUserById(user?.userId);

      createdBook.Owner = author;

      return await this.bookRepository.save(createdBook);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAllBooks(): Promise<Book[]> {
    try {
      return this.bookRepository.find();
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

      return await this.bookRepository.save(updatedBook);
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

      await this.bookRepository.delete(BookId);

      return deletedBook;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
