import { CreateUserRoutineLogDto } from './dto/create-user_routine_log.dto';
import { UpdateUserRoutineLogDto } from './dto/update-user_routine_log.dto';
export declare class UserRoutineLogService {
    create(createUserRoutineLogDto: CreateUserRoutineLogDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserRoutineLogDto: UpdateUserRoutineLogDto): string;
    remove(id: number): string;
}
