import { ObjectType, Field, Int } from '@nestjs/graphql';
import { RefreshToken } from 'src/auth/entities/refresh-token.entinty';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsOptional } from 'class-validator';

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
  @IsString()
  Address?: string;

  @Column({ nullable: true })
  @Field({ description: 'Created Date', nullable: true })
  CreatedAt: Date;

  @Column({ nullable: true })
  @Field({ description: 'Created Date', nullable: true })
  UpdatedAt: Date;

  @OneToMany((type) => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];
}
