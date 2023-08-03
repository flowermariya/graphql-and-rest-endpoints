import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface IUser {
  userId: string;
  phone: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    console.log('user from current user', user);
    const userLoggedIn: IUser = {
      phone: user.PhoneNumber,
      userId: user.UserId,
    };
    return userLoggedIn;
  },
);
