import { RoutinesService } from './routines.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
export declare class RoutinesController {
    private readonly routinesService;
    constructor(routinesService: RoutinesService);
    create(createRoutineDto: CreateRoutineDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRoutineDto: UpdateRoutineDto): string;
    remove(id: string): string;
}
