import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginBySendOTP } from './dto/create-auth.input';
import { ConfirmInput } from './dto/confirm-otp.input';
import { ConfirmOutput } from './dto/confirm-otp.output';
import { CreateAuthOutput } from './dto/create-auth.output';
import { TokenOutput } from './dto/refresh-token.output';
import { RefreshTokenInput } from './dto/refresh-token.input';
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // Mutation to initiate login process using OTP
  @Mutation(() => CreateAuthOutput)
  async loginByOtp(
    @Args('loginBySendOTP') loginBySendOTP: LoginBySendOTP,
  ): Promise<CreateAuthOutput> {
    return this.authService.loginByOtp(loginBySendOTP);
  }

  // Mutation to confirm OTP and login the user
  @Mutation(() => ConfirmOutput)
  async confirmOTP(
    @Args('confirmInput') confirmInput: ConfirmInput,
  ): Promise<ConfirmOutput> {
    return this.authService.confirmOTP(confirmInput);
  }

  // Mutation to refresh token
  @Mutation(() => TokenOutput)
  async refreshToken(
    @Args('input') refreshTokenInput: RefreshTokenInput,
  ): Promise<TokenOutput> {
    return this.authService.refreshToken(refreshTokenInput);
  }
}
