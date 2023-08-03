import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthConfig {
  public jwtTokenSecret = 'jwt-secret';
  public jwtRefreshTokenSecret = 'jwt-refresh-secret';
  public refreshTokenLife: number = 60 * 60 * 24 * 7 * 2; // 2 weeks
  public tokenLife: number = 60 * 60 * 24; // 1 Day
}
