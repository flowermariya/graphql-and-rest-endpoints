import { ObjectType, Field } from '@nestjs/graphql';
import { RefreshToken } from 'src/auth/entities/refresh-token.entinty';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsOptional, IsNumber, IsPhoneNumber } from 'class-validator';
import { Book } from 'src/book/entities/book.entity';
import { DateTimeScalar } from 'src/utils/scalar';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Unique Identifier of the User' })
  UserId: string;

  @Column()
  @Field({ description: 'Phone Number of the User' })
  PhoneNumber: string;

  @Column({ nullable: true })
  @Field({ description: 'Name of the User', nullable: true })
  Name?: string;

  @Column({ nullable: true })
  @Field({ description: 'Gender of the User', nullable: true })
  Gender?: string;

  @Column({ nullable: true })
  @Field({ description: 'Address of the User', nullable: true })
  Age?: number;

  @Field(() => DateTimeScalar)
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Field(() => DateTimeScalar)
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  UpdatedAt: Date;

  @OneToMany(() => Book, (book) => book.Owner)
  Books: Book[];

  @OneToMany((type) => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];
}
