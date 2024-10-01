import { UserRoutineLogService } from './user_routine_log.service';
import { CreateUserRoutineLogDto } from './dto/create-user_routine_log.dto';
import { UpdateUserRoutineLogDto } from './dto/update-user_routine_log.dto';
export declare class UserRoutineLogController {
    private readonly userRoutineLogService;
    constructor(userRoutineLogService: UserRoutineLogService);
    create(createUserRoutineLogDto: CreateUserRoutineLogDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserRoutineLogDto: UpdateUserRoutineLogDto): string;
    remove(id: string): string;
}
