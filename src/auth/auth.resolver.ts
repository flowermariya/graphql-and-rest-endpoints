import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginBySendOTP } from './dto/create-auth.input';
import { ConfirmInput } from './dto/confirm-otp.input';
import { ConfirmOutput } from './dto/confirm-otp.output';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean)
  async loginByOtp(
    @Args('loginBySendOTP') loginBySendOTP: LoginBySendOTP,
  ): Promise<Boolean> {
    return this.authService.loginByOtp(loginBySendOTP);
  }

  @Mutation(() => ConfirmOutput)
  async confirmOTP(
    @Args('confirmInput') confirmInput: ConfirmInput,
  ): Promise<ConfirmOutput> {
    return this.authService.confirmOTP(confirmInput);
  }
}
