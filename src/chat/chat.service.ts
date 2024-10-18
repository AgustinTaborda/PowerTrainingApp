import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { UserEntity } from '../users/entities/user.entity';
import { Role } from 'src/auth/roles.enum';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  // Obtener el usuario con rol de administrador
  async getAdminUser(): Promise<UserEntity> {
    const admin = await this.userRepository.findOne({
      where: { role: Role.Admin },
    });
    if (!admin) {
      throw new Error('Admin user not found');
    }
    return admin;
  }

  // Obtener el historial de chat entre el usuario y el admin
  async getChatHistory(userId: string): Promise<Message[]> {
    const admin = await this.getAdminUser(); // Obtener el admin
    return this.messageRepository.find({
      where: [
        { sender: { id: userId }, receiver: { id: admin.id } },
        { sender: { id: admin.id }, receiver: { id: userId } },
      ],
      order: { timestamp: 'ASC' },
    });
  }

  // Guardar el mensaje entre dos usuarios
  async saveMessage(
    senderId: string,
    receiverId: string,
    content: string,
  ): Promise<Message> {
    const sender = await this.userRepository.findOne({
      where: { id: senderId },
    });
    const receiver = await this.userRepository.findOne({
      where: { id: receiverId },
    });

    if (!sender || !receiver) {
      throw new Error('Sender or receiver not found');
    }

    const message = this.messageRepository.create({
      content,
      sender,
      receiver,
    });
    // Actualizar el timestamp del último mensaje del sender
    if (receiver.role === Role.Admin) {
      sender.lastMessageTimestamp = new Date();
      await this.userRepository.save(sender);
    }

    return this.messageRepository.save(message);
  }

  async getNewMessageStatus(
    adminId: string,
  ): Promise<{ [key: string]: boolean }> {
    const messages = await this.messageRepository.find({
      where: { receiver: { id: adminId }, isRead: false },
    });

    const status: { [key: string]: boolean } = {};
    messages.forEach((message) => {
      status[message.sender.id] = true;
    });

    return status;
  }

  async getUsersOrderedByLastMessage(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();

    // Ordenar usuarios: primero por timestamp más reciente, luego los que tienen lastMessageTimestamp como null
    users.sort((a, b) => {
      if (a.lastMessageTimestamp === null && b.lastMessageTimestamp !== null) {
        return 1; // b debe ir antes que a
      }
      if (a.lastMessageTimestamp !== null && b.lastMessageTimestamp === null) {
        return -1; // a debe ir antes que b
      }
      if (a.lastMessageTimestamp === null && b.lastMessageTimestamp === null) {
        return 0; // ambos son iguales
      }
      // Si ambos tienen timestamp, ordenar por fecha más reciente
      return (
        new Date(b.lastMessageTimestamp).getTime() -
        new Date(a.lastMessageTimestamp).getTime()
      );
    });

    return users;
  }

  // Marcar mensajes como leídos
  async markMessagesAsRead(userId: string, adminId: string): Promise<void> {
    await this.messageRepository.update(
      { sender: { id: userId }, receiver: { id: adminId }, isRead: false },
      { isRead: true },
    );
  }
}
