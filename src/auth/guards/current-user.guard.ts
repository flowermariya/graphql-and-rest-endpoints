import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// This interface is used to define the user object
export interface IUser {
  userId: string;
  phone: string;
}

// This decorator is used to retrieve the current user from the request
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    const userLoggedIn: IUser = {
      phone: user.PhoneNumber,
      userId: user.UserId,
    };
    return userLoggedIn;
  },
);
