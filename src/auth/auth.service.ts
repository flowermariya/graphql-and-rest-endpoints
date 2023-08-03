import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginBySendOTP } from './dto/create-auth.input';
import { ConfirmInput } from './dto/confirm-otp.input';
import axios from 'axios';
import { ConfirmOutput } from './dto/confirm-otp.output';
import { UserService } from 'src/user/user.service';
import { sign } from 'jsonwebtoken';
import { AuthConfig } from './auth.config';
import { RefreshTokenPayloadDto } from './dto/token-payload.input';
import { RefreshToken } from './entities/refresh-token.entinty';
import { addSeconds } from 'date-fns';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private authConfig: AuthConfig,
    @InjectRepository(RefreshToken)
    private refreshTokenRepo: Repository<RefreshToken>,
  ) {}

  async loginByOtp(input: LoginBySendOTP): Promise<Boolean> {
    try {
      const url = `${process.env.OTP_URL}${process.env.SMS_OTP_APIKEY}/SMS/${input?.PhoneNumber}/AUTOGEN/Otp`;

      await axios.get(url);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async confirmOTP(input: ConfirmInput): Promise<ConfirmOutput> {
    try {
      const { PhoneNumber, Otp } = input;
      const url = `${process.env.OTP_URL}${process.env.SMS_OTP_APIKEY}/SMS/VERIFY3/${PhoneNumber}/${Otp}`;

      const response = await axios.get(url);

      if (response.data?.Status !== 'Success') {
        throw new UnauthorizedException(
          response.data?.Details || 'INVALID OTP',
        );
      }

      let user = await this.usersService.findUserByPhoneNumber(PhoneNumber);

      if (!user) {
        user = await this.usersService.createUser({
          PhoneNumber,
        });
      }

      const payload = {
        ...user,
      };

      const token = sign(payload, this.authConfig.jwtTokenSecret, {
        expiresIn: this.authConfig.tokenLife,
      });

      const refreshToken = await this.createRefreshToken({
        user,
        ip: '127.0.0.1',
        userAgent: 'Microsoft',
      });

      return {
        accessToken: token,
        refreshToken: refreshToken?.refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async createRefreshToken(
    refreshTokenPayload: RefreshTokenPayloadDto,
  ): Promise<RefreshToken> {
    try {
      const refreshToken = new RefreshToken();
      refreshToken.user = refreshTokenPayload?.user;
      refreshToken.userAgent = refreshTokenPayload?.userAgent;
      refreshToken.ip = refreshTokenPayload?.ip;

      refreshToken.refreshToken = sign(
        { userId: refreshTokenPayload.user.UserId },
        this.authConfig.jwtRefreshTokenSecret,
        { expiresIn: this.authConfig.refreshTokenLife },
      );

      refreshToken.expiresAt = addSeconds(
        new Date(),
        this.authConfig.refreshTokenLife,
      );

      return this.refreshTokenRepo.save(refreshToken);
    } catch (error) {
      throw error;
    }
  }
}
