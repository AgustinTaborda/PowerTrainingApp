import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
@Entity('user_routine_exercise')
export class UserRoutineExercise {
    @PrimaryGeneratedColumn('uuid')
    userId: string = uuid();

    @Column({ type: 'varchar', length: 255 })
    exerciseId: string = uuid();

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    repetitions: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    wight: number;



}
