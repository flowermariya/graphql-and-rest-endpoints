import { Controller, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBySendOTP } from './dto/create-auth.input';
import { ConfirmInput } from './dto/confirm-otp.input';
import { ConfirmOutput } from './dto/confirm-otp.output';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAuthOutput } from './dto/create-auth.output';
import { TokenOutput } from './dto/refresh-token.output';
import { RefreshTokenInput } from './dto/refresh-token.input';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Post API initiate login process using OTP
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

  // Post API to confirm OTP and login the user
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

  // Post API to refresh token
  @Post('refreshToken')
  @ApiOperation({
    summary: 'Refreshes the access token using the refresh token',
  })
  @ApiResponse({
    status: 201,
    description: 'Token refreshed successfully.',
  })
  async refreshToken(
    @Query() refreshTokenInput: RefreshTokenInput,
  ): Promise<TokenOutput> {
    return this.authService.refreshToken(refreshTokenInput);
  }
}
