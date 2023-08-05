import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, Matches } from 'class-validator';

@InputType()
export class LoginBySendOTP {
  @Field({
    description: 'Phone number of the user needs to logged in',
  })
  @IsNotEmpty({ message: 'Phone number is required' })
  @IsPhoneNumber('IN', {
    message: 'Phone number should be valid',
  })
  @ApiProperty({ description: 'Phone number of the user needs to logged in' })
  PhoneNumber: string;
}
