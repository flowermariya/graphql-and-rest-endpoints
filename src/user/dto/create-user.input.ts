import { InputType, Field } from '@nestjs/graphql';
import { IsPhoneNumber, MaxLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field({ description: 'Phone Number of the User' })
  @IsPhoneNumber('IN', {
    message: 'Phone number should be valid',
  })
  @MaxLength(10, {
    message: 'Phone number should be exactly 10 digits and not start with 0',
  })
  PhoneNumber: string;
}
