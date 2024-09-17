import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from "uuid";
@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ type: 'varchar',length: 255})
    name: string;

    @Column({ type: 'varchar',length: 255})
    lastName: string;

    @Column({ type: 'date'})
    birthDay: Date;

    @Column({ type: 'boolean'})
    isAdmin: boolean;

    @Column({ type: 'varchar',length: 255})
    email: string;

    @Column({ type: 'varchar',length: 255})
    password: string;
    
    @Column({ type: 'date'})
    subscriptionEndDate: Date;
    

}