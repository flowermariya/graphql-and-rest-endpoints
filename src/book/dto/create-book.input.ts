import { InputType, Int, Field } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class CreateBookInput {
  @ApiProperty({ description: 'Title of the book' })
  @Field({ description: 'Title of the book ' })
  @IsNotEmpty()
  @IsString()
  Title: string;

  @ApiPropertyOptional({ description: 'Author of the book', nullable: true })
  @Field({ description: 'Author of the book ', nullable: true })
  @IsOptional()
  @IsString()
  AuthorName: string;

  @ApiPropertyOptional({ description: 'Price of the book', nullable: true })
  @Field(() => Int, { description: 'Price of the book', nullable: true })
  @IsOptional()
  @IsNumber()
  Price: number;

  @ApiPropertyOptional({
    description: 'Date of the book published',
    nullable: true,
  })
  @Field({ description: 'Date of the book published', nullable: true })
  @IsString()
  @IsOptional()
  PublishedOn?: Date;
}
