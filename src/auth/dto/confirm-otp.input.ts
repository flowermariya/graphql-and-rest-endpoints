import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ConfirmInput {
  @Field()
  PhoneNumber: string;

  @Field()
  Otp: string;
}
