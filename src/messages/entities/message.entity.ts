import { NotificationEntity } from "src/notifications/entities/notification.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
@Entity('messages')
export class MessageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    subject: string;

    @Column({ type: 'varchar', length: 255 })
    body: string;

    @OneToMany(() => NotificationEntity, (notification) => notification.messageId)
    notification: NotificationEntity[]
}
