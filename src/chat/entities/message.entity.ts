import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('chat_messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @ManyToOne(() => UserEntity, { eager: true }) // Cargar automáticamente el remitente
  @JoinColumn({ name: 'senderId' })
  sender: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true }) // Cargar automáticamente el receptor
  @JoinColumn({ name: 'receiverId' })
  receiver: UserEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ type: 'boolean', default: false })
  isRead: boolean;
}
