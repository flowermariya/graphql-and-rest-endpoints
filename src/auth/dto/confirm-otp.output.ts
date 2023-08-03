import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ConfirmOutput {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
