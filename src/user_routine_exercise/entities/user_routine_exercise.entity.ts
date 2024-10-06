import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { TrainingDayEntity } from 'src/training_day/entities/training_day.entity';
import { ExerciseEntity } from 'src/exercises/entities/exercise.entity';
import { UserProgressEntity } from 'src/user-progress/entities/user-progress.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('user_routine_exercises')
export class UserRoutineExerciseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => TrainingDayEntity, (trainingDay) => trainingDay.exercises, { nullable: false })
  trainingDay: TrainingDayEntity;

  @ManyToOne(() => ExerciseEntity, { nullable: false })
  exercise: ExerciseEntity;

  @Column({ type: 'int', nullable: false })
  series: number;

  @Column({ type: 'int', nullable: false })
  repetitions: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight: number;  // Peso levantado en el ejercicio (opcional)

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @OneToMany(() => UserProgressEntity, (log) => log.userRoutineExercise)
  logs: UserProgressEntity[];

  @ManyToOne(() => UserEntity, (user) => user.userRoutineExercises)
  user: UserEntity;
}
