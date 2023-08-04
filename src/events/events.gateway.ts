import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import { BookService } from 'src/book/book.service';
import { socketAuthenticationMiddleware } from 'src/auth/configs/websocket.config';

@WebSocketGateway()
export class EventsGateway implements OnModuleInit {
  constructor(private readonly bookService: BookService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.use(socketAuthenticationMiddleware);

    this.server.on('connection', (socket) => {
      console.log('socketId', socket.id);
    });

    this.bookService.on('CreateBook', (book) => {
      this.server.emit('CreateBook', book);
    });

    this.bookService.on('UpdateBook', (update) => {
      this.server.emit('UpdateBook', update);
    });

    this.bookService.on('DeleteBook', (books) => {
      this.server.emit('DeleteBook', books);
    });
  }

  @SubscribeMessage('ChatRoom')
  handleMessage(@MessageBody() Body: any) {
    this.server.emit('SendMessageInRoom', Body);
  }
}
