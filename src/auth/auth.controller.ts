import { Controller, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBySendOTP } from './dto/create-auth.input';
import { ConfirmInput } from './dto/confirm-otp.input';
import { ConfirmOutput } from './dto/confirm-otp.output';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAuthOutput } from './dto/create-auth.output';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('loginByOtp')
  @ApiOperation({
    summary: 'Initiates a login process using an OTP sent to the user',
  })
  @ApiResponse({
    status: 201,
    description: 'Otp send successfully.',
  })
  async loginByOtp(
    @Query() loginBySendOTP: LoginBySendOTP,
  ): Promise<CreateAuthOutput> {
    return this.authService.loginByOtp(loginBySendOTP);
  }

  @Post('confirmOTP')
  @ApiOperation({
    summary:
      'Confirms the OTP entered by the user and logs them in if the OTP is correct',
  })
  @ApiResponse({
    status: 201,
    description: 'Otp success, user logged in.',
  })
  async confirmOTP(
    @Query() confirmInput: ConfirmInput,
  ): Promise<ConfirmOutput> {
    return this.authService.confirmOTP(confirmInput);
  }
}
