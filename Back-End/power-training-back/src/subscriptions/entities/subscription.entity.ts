import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import {v4 as uuid} from "uuid";

@Entity('subscriptions')
export class SubscriptionEntity {

    @PrimaryGeneratedColumn()
    id: string = uuid();

    @Column()
    isActive: boolean;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    userId: string = uuid();




}

