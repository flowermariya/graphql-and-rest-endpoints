import { Controller, Post, Body, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBySendOTP } from './dto/create-auth.input';
import { ConfirmInput } from './dto/confirm-otp.input';
import { ConfirmOutput } from './dto/confirm-otp.output';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('loginByOtp')
  async loginByOtp(@Query() loginBySendOTP: LoginBySendOTP): Promise<Boolean> {
    return this.authService.loginByOtp(loginBySendOTP);
  }

  @Post('confirmOTP')
  async confirmOTP(
    @Query() confirmInput: ConfirmInput,
  ): Promise<ConfirmOutput> {
    return this.authService.confirmOTP(confirmInput);
  }
}
