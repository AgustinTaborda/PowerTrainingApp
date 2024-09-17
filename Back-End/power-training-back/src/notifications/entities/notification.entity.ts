import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from "uuid";

export enum ProcessedState {
    NOT_PROCESSED = 'NOT_PROCESSED',
    PROCESSED = 'PROCESSED',
    PROCESSING = 'PROCESSING'
}

@Entity('notifications')
export class NotificationEntity {
    
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    processedDate: Date;

    @Column()
    messageId: string = uuid();

    @Column({
        type: 'enum',
        enum: ProcessedState,
        default: ProcessedState.NOT_PROCESSED
    })
    @Column()
    processedState: ProcessedState; 
    @Column()   
    queuedDate: Date;
    @Column()
    methodToSend: string;
    @Column()
    userId: string = uuid();


   
}