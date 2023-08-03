import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString, IsNumber } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field({ description: 'Name of the User', nullable: true })
  @IsString()
  @IsOptional()
  Name: string;

  @Field({ description: 'Gender of the User', nullable: true })
  @IsOptional()
  @IsString()
  Gender: string;

  @Field({ description: 'Address of the User', nullable: true })
  @IsOptional()
  @IsNumber()
  Age: number;
}
