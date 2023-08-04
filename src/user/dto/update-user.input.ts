import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { UserGender } from 'src/enums/user.enum';

@InputType()
export class UpdateUserInput {
  @ApiPropertyOptional({ description: 'Name of the user', example: 'John Doe' })
  @Field({ description: 'Name of the User', nullable: true })
  @IsString()
  @IsOptional()
  Name: string;

  @ApiPropertyOptional({
    description: 'Gender of the user',
    example: 'Female',
    enum: UserGender,
  })
  @Field(() => UserGender, {
    description: 'Gender of the User',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(UserGender)
  Gender: string;

  @ApiPropertyOptional({
    description: 'Age of the User',
    example: '16',
  })
  @Field({ description: 'Age of the User', nullable: true })
  @IsOptional()
  @IsNumber()
  Age: number;
}
