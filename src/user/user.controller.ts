import { Controller, Get, Put, Body, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { JwtAuthGuard } from 'src/auth/guards/auth.jwt.rest.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth('JWT-auth')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('findAllUsers')
  @ApiOperation({ summary: 'Retrieves all the users from the database' })
  @ApiResponse({
    status: 201,
    description: 'All users Retrieved successfully.',
  })
  findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Put('updateUser')
  @ApiOperation({
    summary:
      'Updates the information for the user identified by the provided phone number.',
  })
  @ApiResponse({
    status: 201,
    description: 'Updated user information successfully.',
  })
  updateUser(
    @Query('phoneNumber') phoneNumber: string,
    @Body() updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userService.updateUser(phoneNumber, updateUserInput);
  }
}
