import { CreateUserRoutineExerciseDto } from './dto/create-user_routine_exercise.dto';
import { UpdateUserRoutineExerciseDto } from './dto/update-user_routine_exercise.dto';
export declare class UserRoutineExerciseService {
    create(createUserRoutineExerciseDto: CreateUserRoutineExerciseDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserRoutineExerciseDto: UpdateUserRoutineExerciseDto): string;
    remove(id: number): string;
}
