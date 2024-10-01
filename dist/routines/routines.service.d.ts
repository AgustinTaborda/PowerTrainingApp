import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
export declare class RoutinesService {
    create(createRoutineDto: CreateRoutineDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRoutineDto: UpdateRoutineDto): string;
    remove(id: number): string;
}
