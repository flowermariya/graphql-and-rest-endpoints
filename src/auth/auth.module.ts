<<<<<<< HEAD
=======
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

>>>>>>> main
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { UserModule } from 'src/user/user.module';
import { AuthConfig } from './auth-gql.config';
import { RefreshToken } from './entities/refresh-token.entinty';
import { PassportModule } from '@nestjs/passport';
<<<<<<< HEAD
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth.jwt';
import { AuthController } from './auth.controller';
import restAuthConfig from './auth-rest.config';
=======
import { JwtModule } from '@nestjs/jwt'; // <-- Import JwtModule
import { JwtStrategy } from './auth.jwt';
import { AuthController } from './auth.controller';
>>>>>>> main

@Module({
  providers: [AuthResolver, AuthService, AuthConfig, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([Auth, RefreshToken]),
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
<<<<<<< HEAD
    JwtModule.register(restAuthConfig),
  ],
  exports: [JwtStrategy, PassportModule, AuthService, JwtModule],
  controllers: [AuthController],
=======
    JwtModule.register({
      secret: 'YOUR_SECRET',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [JwtStrategy, PassportModule, AuthService, JwtModule],
  controllers: [AuthController], // <-- Add JwtModule here
>>>>>>> main
})
export class AuthModule {}
