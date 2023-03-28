import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: ['http://localhost:4200'] },
  namespace: '/notification',
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;
}
