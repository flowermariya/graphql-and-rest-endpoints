import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, Matches } from 'class-validator';

@InputType()
export class LoginBySendOTP {
  @Field({
    description: 'Phone number of the user needs to logged in',
  })
  @IsNotEmpty({
    message() {
      return 'Phone number is required';
    },
  })
  @IsPhoneNumber('IN', {
    message: 'Phone number should be valid',
  })
  @Matches(/^[1-9][0-9]{9}$/, {
    message: 'Phone number should be exactly 10 digits and not start with 0',
  })
  @ApiProperty({ description: 'Phone number of the user needs to logged in' })
  PhoneNumber: string;
}
