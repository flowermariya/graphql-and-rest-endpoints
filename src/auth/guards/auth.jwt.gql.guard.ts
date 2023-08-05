import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  // This method is called by the AuthGuard to handle the request
  handleRequest(err: any, user: any, info: Error) {
    if ((info || err) && !user) throw new UnauthorizedException(info.message);
    return user;
  }

  // This method is called by GraphQL to handle the request
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
