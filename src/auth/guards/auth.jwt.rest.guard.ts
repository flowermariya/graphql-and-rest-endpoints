import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  // This method is called by the AuthGuard to handle the request
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const jwt = request.headers.authorization.split(' ')[1];

      const decoded = this.jwtService.verify(jwt);

      request.user = decoded;

      return !!decoded;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
