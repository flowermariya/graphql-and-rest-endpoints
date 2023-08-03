import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @ApiPropertyOptional({ description: 'Name of the user', example: 'John Doe' })
  @Field({ description: 'Name of the User', nullable: true })
  @IsString()
  @IsOptional()
  Name: string;

  @ApiPropertyOptional({
    description: 'Phone number of the user',
    example: 'Female',
  })
  @Field({ description: 'Gender of the User', nullable: true })
  @IsOptional()
  @IsString()
  Gender: string;

  @ApiPropertyOptional({
    description: 'Phone number of the user',
    example: '16',
  })
  @Field({ description: 'Address of the User', nullable: true })
  @IsOptional()
  @IsNumber()
  Age: number;
}
