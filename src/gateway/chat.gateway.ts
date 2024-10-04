import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt'; // Suponiendo que usas JWT para autenticación

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private adminRoom = 'adminRoom'; // Sala donde se unirá el entrenador

  constructor(private jwtService: JwtService) {} // Suponiendo que usas JWT

  // Cuando un cliente se conecta
  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization;
    try {
      const decoded = this.jwtService.verify(token);
      const role = decoded.role;

      if (role === 'Role.Admin') {
        client.join(this.adminRoom); // El entrenador se une a la sala del admin
        console.log(`Entrenador conectado: ${client.id}`);
      } else if (role === 'Role.User') {
        console.log(`Cliente conectado: ${client.id}`);
      }
    } catch (error) {
      client.disconnect();
      console.log(`Conexión denegada para: ${client.id}`);
    }
  }

  // Cuando un cliente se desconecta
  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  // Evento personalizado para recibir mensajes del cliente
  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: { message: string }) {
    // Todos los mensajes de los clientes van al entrenador (adminRoom)
    this.server.to(this.adminRoom).emit('receiveMessage', {
      message: payload.message,
      from: client.id,
    });
  }

  // Únete a una sala (aunque en este caso es más para el cliente)
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomId: string) {
    client.join(roomId);
    console.log(`Cliente ${client.id} se unió a la sala: ${roomId}`);
  }
}
