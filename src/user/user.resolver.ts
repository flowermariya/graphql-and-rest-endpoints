import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlAuthGuard } from 'src/auth/guards/auth.jwt.gql.guard';
import { UseGuards } from '@nestjs/common';
@UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Mutation(() => User)
  updateUser(
    @Args('userId') UserId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userService.updateUser(UserId, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('userId') UserId: string): Promise<User> {
    return this.userService.removeUser(UserId);
  }
}
