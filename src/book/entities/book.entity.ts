import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Book {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  BookId: string;

  @Column()
  @Field({ description: 'Title of the book ' })
  @IsNotEmpty()
  @IsString()
  Title: string;

  @Column()
  @Field({ description: 'Name of the author of the book' })
  @IsNotEmpty()
  @IsString()
  AuthorName: string;

  @Column()
  @Field(() => Int, { description: 'Price of the book' })
  @IsNotEmpty()
  @IsNumber()
  Price: number;

  @Column({ nullable: true })
  @Field({ description: 'Date of the book published', nullable: true })
  @IsString()
  @IsOptional()
  PublishedOn?: Date;

  @Column({ nullable: true })
  @Field({ description: 'Created Date', nullable: true })
  CreatedAt: Date;

  @Column({ nullable: true })
  @Field({ description: 'Created Date', nullable: true })
  UpdatedAt: Date;
}
