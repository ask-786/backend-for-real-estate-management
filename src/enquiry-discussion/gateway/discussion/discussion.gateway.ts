import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: ['http://localhost:4200'] } })
export class DiscussionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('connedted');
  }

  handleDisconnect(client: any) {
    console.log('disconnected');
  }

  @SubscribeMessage('sendMessage')
  subscribeSendMessage(socket: Socket, message: string) {
    this.server.emit('newMessage', message);
  }
}
