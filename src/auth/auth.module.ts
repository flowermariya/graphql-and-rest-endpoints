import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { UserModule } from 'src/user/user.module';
import { AuthConfig } from './auth.config';
import { RefreshToken } from './entities/refresh-token.entinty';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth.jwt';

@Module({
  providers: [AuthResolver, AuthService, AuthConfig, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([Auth, RefreshToken]),
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}
