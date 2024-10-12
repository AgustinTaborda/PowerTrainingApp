import { UserEntity } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { v4 as uuid } from "uuid";

@Entity('payments')
export class PaymentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();
    
    @Column({ type: 'date',nullable: true})
    paymentDay: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    payment: number;

  /*  @Column({ type: 'varchar',length: 255,nullable: true})
    userId: string = uuid();
    */

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    subscriptionid: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    discount: number;

    @ManyToOne(() => UserEntity, user => user.payments)
    user: UserEntity

   
   
}