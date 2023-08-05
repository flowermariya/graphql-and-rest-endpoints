import { InputType, Int, Field } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateBookInput {
  @ApiProperty({ description: 'Title of the book' })
  @Field({ description: 'Title of the book ' })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  @MinLength(1, { message: 'Title must be at least 1 characters long' })
  @MaxLength(30, { message: 'Title must be at most 30 characters long' })
  Title: string;

  @ApiPropertyOptional({ description: 'Author of the book', nullable: true })
  @Field({
    description: 'Author of the book ',
    nullable: true,
  })
  @IsOptional()
  @MaxLength(15, { message: 'AuthorName must be at most 15 characters long' })
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
  @MaxLength(150, {
    message: 'Description must be at most 150 characters long',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  Description: string;

  @ApiPropertyOptional({ description: 'Price of the book', nullable: true })
  @Field(() => Int, { description: 'Price of the book', nullable: true })
  @IsOptional()
  @IsNumber()
  Price: number;
}
