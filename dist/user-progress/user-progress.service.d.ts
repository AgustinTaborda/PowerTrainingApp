import { CreateUserProgressDto } from './dto/create-user-progress.dto';
import { UpdateUserProgressDto } from './dto/update-user-progress.dto';
export declare class UserProgressService {
    create(createUserProgressDto: CreateUserProgressDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserProgressDto: UpdateUserProgressDto): string;
    remove(id: number): string;
}
