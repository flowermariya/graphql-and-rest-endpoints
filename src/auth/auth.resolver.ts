import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginBySendOTP } from './dto/create-auth.input';
import { ConfirmInput } from './dto/confirm-otp.input';
import { ConfirmOutput } from './dto/confirm-otp.output';
import { CreateAuthOutput } from './dto/create-auth.output';
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => CreateAuthOutput)
  async loginByOtp(
    @Args('loginBySendOTP') loginBySendOTP: LoginBySendOTP,
  ): Promise<CreateAuthOutput> {
    return this.authService.loginByOtp(loginBySendOTP);
  }

  @Mutation(() => ConfirmOutput)
  async confirmOTP(
    @Args('confirmInput') confirmInput: ConfirmInput,
  ): Promise<ConfirmOutput> {
    return this.authService.confirmOTP(confirmInput);
  }
}
