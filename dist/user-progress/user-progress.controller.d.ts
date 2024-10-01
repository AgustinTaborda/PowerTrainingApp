import { UserProgressService } from './user-progress.service';
import { CreateUserProgressDto } from './dto/create-user-progress.dto';
import { UpdateUserProgressDto } from './dto/update-user-progress.dto';
export declare class UserProgressController {
    private readonly userProgressService;
    constructor(userProgressService: UserProgressService);
    create(createUserProgressDto: CreateUserProgressDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserProgressDto: UpdateUserProgressDto): string;
    remove(id: string): string;
}
