import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class UpdateBookInput {
  @Field({ description: 'Id of the book needs to update' })
  @IsNotEmpty()
  @IsString()
  BookId: string;

  @Field({ description: 'Title of the book ', nullable: true })
  @IsOptional()
  @IsString()
  Title: string;

  @Field({ description: 'Name of the author of the book', nullable: true })
  @IsOptional()
  @IsString()
  AuthorName: string;

  @Field(() => Int, { description: 'Price of the book', nullable: true })
  @IsOptional()
  @IsNumber()
  Price: number;

  @Field({ description: 'Date of the book published', nullable: true })
  @IsString()
  @IsOptional()
  PublishedOn: Date;
}
