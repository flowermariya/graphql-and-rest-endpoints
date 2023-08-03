import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { DateTimeScalar } from 'src/utils/scalar';

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class RefreshToken {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  refreshToken: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.refreshTokens, { eager: true })
  user: User;

  @Field({ nullable: true })
  @Column({ nullable: true })
  userAgent: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  ip: string;

  @Field(() => DateTimeScalar)
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(() => DateTimeScalar)
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Field(() => DateTimeScalar)
  @Column({ type: 'timestamptz' })
  expiresAt: Date;
}
