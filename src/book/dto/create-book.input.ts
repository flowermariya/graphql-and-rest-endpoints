import { InputType, Int, Field } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateBookInput {
  @ApiProperty({ description: 'Title of the book' })
  @Field({ description: 'Title of the book ' })
  @IsNotEmpty()
  @IsString({ message: 'Title must be a string' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  Title: string;

  @ApiPropertyOptional({ description: 'Author of the book', nullable: true })
  @Field({
    description: 'Author of the book ',
    nullable: true,
  })
  @IsOptional()
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
  Description: string;

  @ApiPropertyOptional({ description: 'Price of the book', nullable: true })
  @Field(() => Int, { description: 'Price of the book', nullable: true })
  @IsOptional()
  @IsNumber({})
  Price: number;
}
