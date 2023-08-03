import { User } from 'src/user/entities/user.entity';

export class RefreshTokenPayloadDto {
  user: User;
  userAgent: string;
  ip: string;
}
