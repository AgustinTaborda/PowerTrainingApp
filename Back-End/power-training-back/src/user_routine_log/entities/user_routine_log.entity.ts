import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
@Entity('user_routine_log')
export class UserRoutineLog {

    @PrimaryGeneratedColumn('uuid')
    routineLogId: string = uuid();

    @Column()
    userId: string = uuid();

    @Column()
    exerciseId: string = uuid();

    @Column()
    date: Date;

    @Column()
    repetitions: number;

    @Column()
    wight: number;



}
