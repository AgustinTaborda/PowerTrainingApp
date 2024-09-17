import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import {v4 as uuid} from "uuid";

@Entity('subscriptions')
export class SubscriptionEntity {

    @PrimaryGeneratedColumn()
    id: string = uuid();

    @Column()
    name: string;

    @Column()
    price: number;


}

