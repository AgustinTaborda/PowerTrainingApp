import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRoutineExerciseDto } from './create-user_routine_exercise.dto';

export class UpdateUserRoutineExerciseDto extends PartialType(CreateUserRoutineExerciseDto) {}
