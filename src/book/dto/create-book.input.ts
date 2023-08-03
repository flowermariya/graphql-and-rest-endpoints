import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  IsOptional,
} from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field({ description: 'Title of the book ' })
  @IsNotEmpty()
  @IsString()
  Title: string;

  @Field({ description: 'Name of the author of the book' })
  @IsNotEmpty()
  @IsUUID()
  AuthorId: string;

  @Field(() => Int, { description: 'Price of the book' })
  @IsOptional()
  @IsNumber()
  Price: number;

  @Field({ description: 'Date of the book published', nullable: true })
  @IsString()
  @IsOptional()
  PublishedOn?: Date;
}
