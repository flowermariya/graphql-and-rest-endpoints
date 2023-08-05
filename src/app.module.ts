import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { BookModule } from './book/book.module';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmPostgresModule } from './typeorm.config';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    TypeOrmPostgresModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      includeStacktraceInErrorResponses: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error) => {
        if (error.extensions.code === 'BAD_REQUEST') {
          return {
            message: error.message,
            code: error.extensions?.code,
            details: error.extensions.originalError,
            path: null,
          };
        }

        return {
          message: error.message,
          code: error.extensions?.code,
          details: error.extensions?.exception,
          path: error.path,
        };
      },
    }),
    BookModule,
    UserModule,
    AuthModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
