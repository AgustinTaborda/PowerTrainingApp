import { UserRoutineExerciseService } from './user_routine_exercise.service';
import { CreateUserRoutineExerciseDto } from './dto/create-user_routine_exercise.dto';
import { UpdateUserRoutineExerciseDto } from './dto/update-user_routine_exercise.dto';
export declare class UserRoutineExerciseController {
    private readonly userRoutineExerciseService;
    constructor(userRoutineExerciseService: UserRoutineExerciseService);
    create(createUserRoutineExerciseDto: CreateUserRoutineExerciseDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserRoutineExerciseDto: UpdateUserRoutineExerciseDto): string;
    remove(id: string): string;
}
