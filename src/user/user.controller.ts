import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { JwtAuthGuard } from 'src/auth/auth.jwt.rest.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('findAllUsers')
  findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Put('updateUser/:userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userService.updateUser(userId, updateUserInput);
  }

  @Delete('removeUser/:userId')
  removeUser(@Param('userId') userId: string): Promise<User> {
    return this.userService.removeUser(userId);
  }
}
