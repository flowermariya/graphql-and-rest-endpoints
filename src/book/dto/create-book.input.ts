import { InputType, Int, Field } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  IsOptional,
} from 'class-validator';

@InputType()
export class CreateBookInput {
  @ApiProperty({ description: 'Title of the book' })
  @Field({ description: 'Title of the book ' })
  @IsNotEmpty()
  @IsString()
  Title: string;

  @ApiPropertyOptional({ description: 'Price of the book' })
  @Field(() => Int, { description: 'Price of the book' })
  @IsOptional()
  @IsNumber()
  Price: number;

  @ApiPropertyOptional({ description: 'Date of the book published' })
  @Field({ description: 'Date of the book published', nullable: true })
  @IsString()
  @IsOptional()
  PublishedOn?: Date;
}
