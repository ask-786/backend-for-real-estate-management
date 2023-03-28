import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EnquiryDiscussionService } from 'src/enquiry-discussion/enquiry-discussion.service';

@WebSocketGateway({
  cors: { origin: ['http://localhost:4200'] },
  namespace: '/chat',
})
export class DiscussionGateway {
  constructor(private enquriyDiscussionService: EnquiryDiscussionService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  subscribeSendMessage(
    socket: Socket,
    data: {
      message: string;
      enquiryId: string;
      senderId: string;
    },
  ) {
    this.enquriyDiscussionService
      .createMessage(data.message, data.enquiryId, data.senderId)
      .then((newMessage) => {
        socket.to(data.enquiryId).emit('receiveMessage', newMessage);
      });
  }

  @SubscribeMessage('join-room')
  subscribeJoinRoom(socket: Socket, roomId: string) {
    socket.join(roomId);
  }

  @SubscribeMessage('leave-room')
  subscribeLeaveRoom(socket: Socket, roomId: string) {
    socket.leave(roomId);
  }
}
