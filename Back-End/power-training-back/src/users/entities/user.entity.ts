import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from "uuid";
@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ nullable: true,type: 'varchar',length: 255 }) // ID de Google OAuth
    googleId: string;

    @Column({ nullable: true,type: 'varchar',length: 255})
    name: string;

    @Column({ nullable: true,type: 'varchar',length: 255})
    lastName: string;

    @Column({nullable: true, type: 'date'})
    birthDay: Date;

    @Column({ type: 'boolean', default: false})
    isAdmin: boolean;

    @Column({nullable: true, type: 'varchar',length: 255})
    email: string;

    @Column({nullable: true, type: 'varchar',length: 255})
    password: string;
    
    @Column({nullable: true, type: 'date',default: new Date()})
    subscriptionEndDate: Date;
    picture: string;
    

}