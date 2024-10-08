import { MessageEntity } from "src/messages/entities/message.entity";
import { UserEntity } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";

export enum PeriodType {
    DAY = 'DAY',
    WEEK = 'WEEK',
    MONTH = 'MONTH',
    YEAR = 'YEAR'
}

@Entity('notification_schedule')
export class NotificationscheduleEntity {

    @PrimaryGeneratedColumn('uuid')
    notificationScheduleId: string = uuid();

    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity;

    @ManyToOne(()=>MessageEntity, (message) => message.id)  
    message: MessageEntity;

    @Column({ type: 'varchar', length: 255, nullable:true })
    periodType: PeriodType;

    @Column({ type: 'varchar', length: 12,nullable:true })
    periodParam:string

    @Column({ type: 'boolean', default: false })
    sended: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    nextSendDate: Date;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
}
