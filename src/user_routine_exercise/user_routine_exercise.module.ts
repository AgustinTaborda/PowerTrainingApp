import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoutineExerciseService } from './user_routine_exercise.service';
import { TrainingDayEntity } from 'src/training_day/entities/training_day.entity';
import { ExerciseEntity } from 'src/exercises/entities/exercise.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserRoutineExerciseEntity } from './entities/user_routine_exercise.entity';
import { UserRoutineExerciseController } from './user_routine_exercise.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRoutineExerciseEntity,
      TrainingDayEntity,
      ExerciseEntity,
      UserEntity,
    ]),
  ],
  controllers: [UserRoutineExerciseController],
  providers: [UserRoutineExerciseService],
})
export class UserRoutineExerciseModule {}
