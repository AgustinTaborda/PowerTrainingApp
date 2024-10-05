import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { RoutineEntity } from 'src/routine/entities/routine.entity';
import { UserRoutineExerciseEntity } from 'src/user_routine_exercise/entities/user_routine_exercise.entity';

@Entity('training_days')
export class TrainingDayEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => RoutineEntity, (routine) => routine.trainingDays, { nullable: false })
  routine: RoutineEntity;

  @Column({ type: 'int', nullable: false })
  dayNumber: number;  // Número de día en la rutina (por ejemplo: 1, 2, 3)

  @Column({ type: 'varchar', length: 100, nullable: true })
  muscleGroup: string;  // Grupo muscular trabajado

  @OneToMany(() => UserRoutineExerciseEntity, (exercise) => exercise.trainingDay)
  exercises: UserRoutineExerciseEntity[];
}
