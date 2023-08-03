import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly userService: UserService,
  ) {}

  async create(createBookInput: CreateBookInput): Promise<Book> {
    console.log(createBookInput);
    try {
      const createdBook = await this.bookRepository.create({
        ...createBookInput,
        CreatedAt: new Date(),
      });

      const author = await this.userService.findOneUserById(
        createBookInput?.AuthorId,
      );

      if (!author) {
        throw new HttpException(
          `Author with ${createBookInput?.AuthorId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      createdBook.Author = author;

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
      return await this.bookRepository.findOne({ where: { BookId } });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateBook(
    BookId: string,
    updateBookInput: UpdateBookInput,
  ): Promise<Book> {
    try {
      const existingBook = await this.findOneBook(BookId);

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

      if (updateBookInput?.AuthorId) {
        const author = await this.userService.findOneUserById(
          updateBookInput?.AuthorId,
        );

        if (!author) {
          throw new HttpException(
            `Author with ${updateBookInput?.AuthorId} not found`,
            HttpStatus.NOT_FOUND,
          );
        }

        updatedBook.Author = author;
      }

      updatedBook.UpdatedAt = new Date();

      return await this.bookRepository.save(updatedBook);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async removeBook(BookId: string): Promise<Book> {
    try {
      const existingBook = await this.findOneBook(BookId);

      if (!existingBook) {
        throw new HttpException(
          `Book with ${BookId} not found to delete`,
          HttpStatus.NOT_FOUND,
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
