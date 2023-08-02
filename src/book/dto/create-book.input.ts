import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateDateColumn } from 'typeorm';

@InputType()
export class CreateBookInput {
  @Field({ description: 'Title of the book ' })
  @IsNotEmpty()
  @IsString()
  Title: string;

  @Field({ description: 'Name of the author of the book' })
  @IsNotEmpty()
  @IsString()
  AuthorName: string;

  @Field(() => Int, { description: 'Price of the book' })
  @IsNotEmpty()
  @IsNumber()
  Price: number;

  @Field({ description: 'Date of the book published', nullable: true })
  @IsString()
  @IsOptional()
  PublishedOn: Date;
}
