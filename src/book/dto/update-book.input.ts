import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

@InputType()
export class UpdateBookInput {
  @ApiPropertyOptional({ description: 'Title of the book' })
  @Field({ description: 'Title of the book ', nullable: true })
  @IsOptional()
  @IsString()
  Title: string;

  @ApiPropertyOptional({ description: 'Author of the book' })
  @Field({ description: 'Author of the book ', nullable: true })
  @IsOptional()
  @IsString()
  AuthorName: string;

  @ApiPropertyOptional({ description: 'Price of the book' })
  @Field(() => Int, { description: 'Price of the book', nullable: true })
  @IsOptional()
  @IsNumber()
  Price: number;

  @ApiPropertyOptional({ description: 'Date of the book published' })
  @Field({ description: 'Date of the book published', nullable: true })
  @IsString()
  @IsOptional()
  PublishedOn: Date;
}
