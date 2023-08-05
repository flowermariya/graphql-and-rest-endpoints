import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TokenOutput {
  @Field()
  accessToken: string;
}
