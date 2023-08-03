import { ObjectType, Field } from '@nestjs/graphql';
import { RefreshToken } from 'src/auth/entities/refresh-token.entinty';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsOptional, IsNumber, IsPhoneNumber } from 'class-validator';
import { Book } from 'src/book/entities/book.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Unique Identifier of the User' })
  UserId: string;

  @Column()
  @IsPhoneNumber()
  @Field({ description: 'Phone Number of the User' })
  PhoneNumber: string;

  @Column({ nullable: true })
  @Field({ description: 'Name of the User', nullable: true })
  @IsString()
  @IsOptional()
  Name?: string;

  @Column({ nullable: true })
  @Field({ description: 'Gender of the User', nullable: true })
  @IsOptional()
  @IsString()
  Gender?: string;

  @Column({ nullable: true })
  @Field({ description: 'Address of the User', nullable: true })
  @IsOptional()
  @IsNumber()
  Age?: number;

  @Column({ nullable: true })
  @Field({ description: 'Created Date', nullable: true })
  CreatedAt: Date;

  @Column({ nullable: true })
  @Field({ description: 'Created Date', nullable: true })
  UpdatedAt: Date;

  @OneToMany(() => Book, (book) => book.Author)
  @Field(() => [Book])
  Books: Book[];

  @OneToMany((type) => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];
}
