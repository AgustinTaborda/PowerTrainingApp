import { Injectable } from '@nestjs/common';
import { CreateUserRoutineExerciseDto } from './dto/create-user_routine_exercise.dto';
import { UpdateUserRoutineExerciseDto } from './dto/update-user_routine_exercise.dto';

@Injectable()
export class UserRoutineExerciseService {
  create(createUserRoutineExerciseDto: CreateUserRoutineExerciseDto) {
    return 'This action adds a new userRoutineExercise';
  }

  findAll() {
    return `This action returns all userRoutineExercise`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRoutineExercise`;
  }

  update(id: number, updateUserRoutineExerciseDto: UpdateUserRoutineExerciseDto) {
    return `This action updates a #${id} userRoutineExercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRoutineExercise`;
  }
}
