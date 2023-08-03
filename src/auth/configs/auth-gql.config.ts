import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthConfig {
  public jwtTokenSecret = process.env.JWT_TOKEN_SECRET;
  public jwtRefreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
  public refreshTokenLife = Number(process.env.JWT_REFRESH_TOKEN_LIFE);
  public tokenLife = Number(process.env.JWT_TOKEN_LIFE);
}
