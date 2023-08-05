import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthConfig } from './configs/auth-gql.config';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private authConfig: AuthConfig,
  ) {
    super({
      secretOrKey: authConfig.jwtTokenSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['HS256'],
    });
  }

  // Passport will build a user object based on the return value of our validate() method, and attach it as a property on the Request object.
  public async validate(payload: any): Promise<User> {
    try {
      if (!payload) throw new UnauthorizedException();
      let { PhoneNumber } = payload;
      if (!PhoneNumber)
        throw new UnauthorizedException(
          'Phone number not found in JWT payload',
        );

      let user = await this.userService.findUserByPhoneNumber(PhoneNumber);

      if (!user) throw new UnauthorizedException('User not found');

      return user;
    } catch (error) {
      throw error;
    }
  }
}
