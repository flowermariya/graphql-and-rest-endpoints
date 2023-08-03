import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const jwt = request.headers.authorization.split(' ')[1];
      console.log('>>jwt', jwt);

      const decoded = this.jwtService.verify(jwt);
      console.log('Decoded JWT:', decoded);
      return !!decoded;
    } catch (err) {
      console.log('JWT verification error:', err);
      return err;
    }
  }
}
