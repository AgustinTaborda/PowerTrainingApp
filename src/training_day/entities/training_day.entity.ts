import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoutineEntity } from 'src/routine/entities/routine.entity';
import { UserRoutineExerciseEntity } from 'src/user_routine_exercise/entities/user_routine_exercise.entity';

@Entity('training_day')
export class TrainingDayEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  date: string;
  
  @Column({ type: 'varchar', nullable: true })
  description: string;

  @OneToMany(() => UserRoutineExerciseEntity, (exercise) => exercise.trainingDay, { cascade: true })
  exercises: UserRoutineExerciseEntity[]; 

  @ManyToOne(() => RoutineEntity, routine => routine.trainingDays, { onDelete: 'CASCADE' })
  routine: RoutineEntity;
}
