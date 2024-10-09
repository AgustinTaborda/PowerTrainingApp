import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { TrainingDayEntity } from 'src/training_day/entities/training_day.entity';
import { ExerciseEntity } from 'src/exercises/entities/exercise.entity';
import { UserProgressEntity } from 'src/user-progress/entities/user-progress.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user_routine_exercises')
export class UserRoutineExerciseEntity {
  @ApiProperty({ example: 1, description: 'ID único del ejercicio de rutina' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: 'Día de entrenamiento asociado al ejercicio', type: () => TrainingDayEntity })
  @ManyToOne(() => TrainingDayEntity, (trainingDay) => trainingDay.exercises, { onDelete: 'CASCADE', nullable: false })
  trainingDay: TrainingDayEntity;

  @ApiProperty({ description: 'Ejercicio asociado al día de entrenamiento', type: () => ExerciseEntity })
  @ManyToOne(() => ExerciseEntity, { nullable: false })
  exercise: ExerciseEntity;

  @ApiProperty({ example: 4, description: 'Número de series a realizar' })
  @Column({ type: 'int', nullable: false })
  series: number;

  @ApiProperty({ example: 12, description: 'Número de repeticiones por serie' })
  @Column({ type: 'int', nullable: false })
  repetitions: number;

  @ApiProperty({ example: 45.5, description: 'Peso levantado durante el ejercicio (opcional)' })
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight: number;

  @ApiProperty({ example: false, description: 'Indica si el ejercicio fue completado o no' })
  @Column({ type: 'boolean', default: false })
  completed: boolean;
  
  @ApiProperty({ example: 7, description: 'Indica cuanto esfuerzo le requirio al usuario finalizar este ejercicio' })
  @Column({ type: 'int', nullable: true })
  rpe: number;

  @ApiProperty({ description: 'Progreso del usuario en este ejercicio', type: () => [UserProgressEntity] })
  @OneToMany(() => UserProgressEntity, (log) => log.userRoutineExercise)
  logs: UserProgressEntity[];

  // @ApiProperty({ description: 'Usuario que realizó el ejercicio', type: () => UserEntity })
  // @ManyToOne(() => UserEntity, (user) => user.userRoutineExercises)
  // user: UserEntity;
}
