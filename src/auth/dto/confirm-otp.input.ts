import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, Length, Matches } from 'class-validator';

@InputType()
export class ConfirmInput {
  @Field({
    description: 'Phone number of the user needs to logged in',
  })
  @IsNotEmpty()
  @Matches(/^[1-9][0-9]{9}$/, {
    message: 'Phone number should be exactly 10 digits and not start with 0',
  })
  @ApiProperty({ description: 'Phone number of the user needs to logged in' })
  PhoneNumber: string;

  @ApiProperty({ description: 'OTP sent to the user' })
  @Field()
  @IsNumberString()
  @Length(6, 6)
  @IsNotEmpty()
  Otp: string;
}
