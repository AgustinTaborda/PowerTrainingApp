import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ExerciseEntity } from './entities/exercise.entity';
import { Repository } from 'typeorm/repository/Repository';
import { v4 as uuid } from "uuid";
import { Status } from './types/status.enum';
import { ChangeStatusDto } from './dto/change-status.dto';
export declare class ExercisesService {
    private exercisesRepository;
    changeStatus(id: string, status: Status): Promise<ChangeStatusDto>;
    constructor(exercisesRepository: Repository<ExerciseEntity>);
    create(createExerciseDto: CreateExerciseDto): Promise<ExerciseEntity>;
    findAllByFilters(filters: {
        name?: string;
        benefits?: string;
        tags?: string;
        status?: string;
    }, page?: number, limit?: number): Promise<{
        data: ExerciseEntity[];
        count: number;
    }>;
    findOne(id: uuid): Promise<ExerciseEntity>;
    update(id: uuid, updateExerciseDto: UpdateExerciseDto): Promise<ExerciseEntity>;
    remove(id: uuid): Promise<import("typeorm").DeleteResult>;
}
