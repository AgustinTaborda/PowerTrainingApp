import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from "uuid";

@Entity('payments')
export class PaymentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();
    
    @Column({ type: 'date'})
    paymentDay: Date;

    @Column({ type: 'date'})
    subscriptionEndDate: Date;

    @Column({ type: 'varchar',length: 255})
    userId: string = uuid();

    @Column({ type: 'varchar',length: 255})
    subscriptionId: string = uuid();

    @Column({ type: 'varchar',length: 255})
    transactionId: string = uuid(); // Para que se usaría?

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    discount: number;
   
}