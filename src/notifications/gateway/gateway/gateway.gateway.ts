import { CLIENT_URL } from './../../../constants/clientUrl.constants';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: [CLIENT_URL] },
  namespace: '/notification',
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;
}
