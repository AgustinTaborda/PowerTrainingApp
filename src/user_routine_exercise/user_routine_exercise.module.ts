import { Module } from '@nestjs/common';
import { UserRoutineExerciseService } from './user_routine_exercise.service';
import { UserRoutineExerciseController } from './user_routine_exercise.controller';

@Module({
  controllers: [UserRoutineExerciseController],
  providers: [UserRoutineExerciseService],
})
export class UserRoutineExerciseModule {}
