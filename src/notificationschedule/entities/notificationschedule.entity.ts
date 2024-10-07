import { MessageEntity } from "src/messages/entities/message.entity";
import { UserEntity } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";

@Entity('notification_schedule')
export class Notificationschedule {

    @PrimaryGeneratedColumn('uuid')
    notificationScheduleId: string = uuid();

    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity;

    @ManyToOne(()=>MessageEntity, (message) => message.id)  
    message: MessageEntity;
}
