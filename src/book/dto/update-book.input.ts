import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsUUID, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class UpdateBookInput {
  @Field({ description: 'Title of the book ', nullable: true })
  @IsOptional()
  @IsString()
  Title: string;

  @Field(() => Int, { description: 'Price of the book', nullable: true })
  @IsOptional()
  @IsNumber()
  Price: number;

  @Field({ description: 'Date of the book published', nullable: true })
  @IsString()
  @IsOptional()
  PublishedOn: Date;
}
