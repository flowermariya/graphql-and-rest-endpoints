// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthResolver } from './auth.resolver';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Auth } from './entities/auth.entity';
// import { UserModule } from 'src/user/user.module';
// import { AuthConfig } from './auth.config';
// import { RefreshToken } from './entities/refresh-token.entinty';
// import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './auth.jwt';

// @Module({
//   providers: [AuthResolver, AuthService, AuthConfig, JwtStrategy],
//   imports: [
//     TypeOrmModule.forFeature([Auth, RefreshToken]),
//     UserModule,
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//   ],
//   exports: [JwtStrategy, PassportModule, AuthService],
// })
// export class AuthModule {}

import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { UserModule } from 'src/user/user.module';
import { AuthConfig } from './auth.config';
import { RefreshToken } from './entities/refresh-token.entinty';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'; // <-- Import JwtModule
import { JwtStrategy } from './auth.jwt';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthResolver, AuthService, AuthConfig, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([Auth, RefreshToken]),
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'YOUR_SECRET',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [JwtStrategy, PassportModule, AuthService, JwtModule],
  controllers: [AuthController], // <-- Add JwtModule here
})
export class AuthModule {}
