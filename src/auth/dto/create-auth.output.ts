import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateAuthOutput {
  @Field()
  status: boolean;

  @Field()
  message: string;
}
