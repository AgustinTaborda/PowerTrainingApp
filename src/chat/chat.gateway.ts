import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private adminConnected = false;

  constructor(private chatService: ChatService) {}

  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    const userRole = client.handshake.query.role as string;

    client.join(userId);
    console.log(`User connected: ${userId}`);

    if (userRole === 'Admin') {
      this.adminConnected = true;
      this.server.emit('adminStatus', { online: true });
    }
  }

  async handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    const userRole = client.handshake.query.role as string;

    console.log(`User disconnected: ${userId}`);

    if (userRole === 'Admin') {
      this.adminConnected = false;
      this.server.emit('adminStatus', { online: false });
    }
  }

  @SubscribeMessage('message')
  async handleMessage(
    client: Socket,
    payload: { senderId: string; content: string; receiverId?: string },
  ): Promise<void> {
    const admin = await this.chatService.getAdminUser();
    const message = await this.chatService.saveMessage(
      payload.senderId,
      payload.receiverId || admin.id,
      payload.content,
    );

    if (payload.senderId !== admin.id) {
      this.server.to(admin.id).emit('message', message);
    }

    this.server.to(payload.senderId).emit('message', message);

    if (payload.senderId === admin.id && payload.receiverId) {
      this.server.to(payload.receiverId).emit('message', message);
    }
  }

  @SubscribeMessage('typing')
  async handleTyping(
    client: Socket,
    payload: { senderId: string; isTyping: boolean },
  ) {
    const admin = await this.chatService.getAdminUser(); // Asegúrate de usar await aquí también
    if (payload.senderId === admin.id) {
      this.server.emit('adminTyping', { isTyping: payload.isTyping });
    }
  }
}
