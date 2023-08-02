import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookInput: CreateBookInput): Promise<Book> {
    try {
      const createdBook = await this.bookRepository.create({
        ...createBookInput,
        CreatedAt: new Date(),
      });

      console.log(createdBook);

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

  async updateBook(updateBookInput: UpdateBookInput): Promise<Book> {
    try {
      const existingBook = await this.findOneBook(updateBookInput?.BookId);

      if (!existingBook) {
        throw new HttpException(
          `Book with ${updateBookInput?.BookId} not found to delete`,
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

  async removeBook(BookId: string): Promise<Book> {
    try {
      const existingBook = await this.findOneBook(BookId);

      if (!existingBook) {
        throw new HttpException(
          `Book with ${BookId} not found to delete`,
          HttpStatus.NOT_FOUND,
        );
      }

      const matchDeleted = Object.assign({}, existingBook);

      await this.bookRepository.delete(BookId);

      return matchDeleted;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
