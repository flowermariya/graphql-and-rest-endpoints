import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: 'Phone Number of the User' })
  PhoneNumber: string;
}
