import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class LoginBySendOTP {
  @Field({
    description: 'Phone number of the user needs to logged in',
  })
  @IsString()
  @IsNotEmpty()
  PhoneNumber: string;
}
