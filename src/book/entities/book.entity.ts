import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { DateTimeScalar } from 'src/utils/scalar';
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
  Title: string;

  @Column({ nullable: true })
  @Field({ description: 'Author name of the book ', nullable: true })
  AuthorName: string;

  @Column({ nullable: true })
  @Field({ description: 'Description of the book ', nullable: true })
  Description: string;

  @ManyToOne(() => User, (user) => user.Books)
  @Field(() => User, {
    description: 'Name of the owner who added this book',
    nullable: true,
  })
  Owner: User;

  @Column({ nullable: true })
  @Field(() => Int, { description: 'Price of the book', nullable: true })
  Price: number;

  @Field(() => Boolean)
  @Column({ nullable: true, default: false })
  IsPublished: boolean;

  @Field(() => DateTimeScalar, { nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  PublishedOn: Date;

  @Field(() => DateTimeScalar)
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Field(() => DateTimeScalar, { nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  UpdatedAt: Date;
}
