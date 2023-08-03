import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Book {
  @Field()
  @Column()
  @PrimaryGeneratedColumn('uuid')
  BookId: string;

  @Column()
  @Field({ description: 'Title of the book ' })
  @IsNotEmpty()
  @IsString()
  Title: string;

  @ManyToOne(() => User, (user) => user.Books)
  @Field(() => User, { description: 'Name of the author of the book' })
  @IsNotEmpty()
  Author: User;

  @Column()
  @Field(() => Int, { description: 'Price of the book', nullable: true })
  @IsOptional()
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
