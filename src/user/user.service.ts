import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    try {
      const user = this.userRepository.create({
        ...createUserInput,
        CreatedAt: new Date(),
      });

      return await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async findOneUserById(authorId): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { UserId: authorId } });
    } catch (error) {
      throw error;
    }
  }

  async findAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw error;
    }
  }

  findUserByPhoneNumber(phone_number: string) {
    try {
      console.log('>>> findUserByPhoneNumber', phone_number);
      return this.userRepository.findOne({
        where: { PhoneNumber: phone_number },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateUser(
    UserId: string,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { UserId } });

      if (!user) {
        throw new HttpException(
          `User with ${UserId} not found to update`,
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedUser = this.userRepository.merge(user, updateUserInput);

      updatedUser.UpdatedAt = new Date();

      return await this.userRepository.save(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  async removeUser(UserId: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { UserId } });

      if (!user) {
        throw new HttpException(
          `User with ${UserId} not found to update`,
          HttpStatus.NOT_FOUND,
        );
      }

      const deletedUser = Object.assign({}, user);

      await this.userRepository.delete(UserId);

      return deletedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
