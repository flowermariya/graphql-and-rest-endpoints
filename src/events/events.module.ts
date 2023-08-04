import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { BookModule } from 'src/book/book.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [EventsGateway],
  imports: [BookModule, AuthModule],
})
export class EventsModule {}
