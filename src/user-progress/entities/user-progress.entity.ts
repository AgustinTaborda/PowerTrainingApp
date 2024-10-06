import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserRoutineExerciseEntity } from 'src/user_routine_exercise/entities/user_routine_exercise.entity';

@Entity('user_progress')
export class UserProgressEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => UserRoutineExerciseEntity, (exercise) => exercise.logs, { nullable: false })
  userRoutineExercise: UserRoutineExerciseEntity;

  @Column({ type: 'int', nullable: false })
  repetitions: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight: number;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  photoUrl: string;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @Column({
    type: 'int',
    nullable: true
  })
  rpe: number | null;  // Índice de esfuerzo percibido (1-10 o null)
}
