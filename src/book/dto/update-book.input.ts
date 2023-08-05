import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsString,
  IsNumber,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

@InputType()
export class UpdateBookInput {
  @ApiPropertyOptional({ description: 'Title of the book', nullable: true })
  @Field({ description: 'Title of the book ', nullable: true })
  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  @MinLength(1, { message: 'Title must be at least 1 characters long' })
  @MaxLength(50, { message: 'Title must be at most 50 characters long' })
  Title: string;

  @ApiPropertyOptional({ description: 'Author of the book', nullable: true })
  @Field({ description: 'Author of the book ', nullable: true })
  @IsOptional()
  @MinLength(2, { message: 'AuthorName must be at least 2 characters long' })
  @MaxLength(30, { message: 'AuthorName must be at most 30 characters long' })
  @IsString({ message: 'AuthorName must be a string' })
  AuthorName: string;

  @ApiPropertyOptional({
    description: 'Description of the book',
    nullable: true,
  })
  @Field({
    description: 'Description of the book ',
    nullable: true,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MinLength(2, { message: 'Description must be at least 2 characters long' })
  @MaxLength(250, {
    message: 'Description must be at most 250 characters long',
  })
  Description: string;

  @ApiPropertyOptional({ description: 'Price of the book', nullable: true })
  @Field(() => Int, { description: 'Price of the book', nullable: true })
  @IsOptional()
  @IsNumber()
  Price: number;
}
