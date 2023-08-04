import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: true })
  @Field({ description: 'Author name of the book ', nullable: true })
  @IsOptional()
  @IsString()
  AuthorName: string;

  @ManyToOne(() => User, (user) => user.Books)
  @Field(() => User, {
    description: 'Name of the owner who added this book',
    nullable: true,
  })
  Owner: User;

  @Column({ nullable: true })
  @Field(() => Int, { description: 'Price of the book', nullable: true })
  @IsOptional()
  @IsNumber()
  Price: number;

  @Column({ nullable: true })
  @Field({ description: 'Date of the book published', nullable: true })
  @IsString()
  @IsOptional()
  @IsDateString({ strict: true })
  PublishedOn?: Date;

  @Column({ nullable: true })
  @Field({ description: 'Created Date', nullable: true })
  CreatedAt: Date;

  @Column({ nullable: true })
  @Field({ description: 'Created Date', nullable: true })
  UpdatedAt: Date;
}
