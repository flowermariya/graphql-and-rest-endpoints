import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { UserModule } from 'src/user/user.module';
import { AuthConfig } from './auth-gql.config';
import { RefreshToken } from './entities/refresh-token.entinty';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth.jwt';
import { AuthController } from './auth.controller';
import restAuthConfig from './auth-rest.config';

@Module({
  providers: [AuthResolver, AuthService, AuthConfig, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([Auth, RefreshToken]),
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(restAuthConfig),
  ],
  exports: [JwtStrategy, PassportModule, AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
