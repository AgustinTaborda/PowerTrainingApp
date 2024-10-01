import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ExerciseEntity } from './entities/exercise.entity';
import { ExerciseSeed } from './exercises.seed';
import { ChangeStatusDto } from './dto/change-status.dto';
export declare class ExercisesController {
    private readonly exercisesService;
    private readonly exerciseSeed;
    constructor(exercisesService: ExercisesService, exerciseSeed: ExerciseSeed);
    seedExercises(): Promise<ExerciseEntity[]>;
    create(createExerciseDto: CreateExerciseDto): Promise<ExerciseEntity>;
    findAllByFilters(name?: string, benefits?: string, tags?: string, status?: string, page?: number, limit?: number): Promise<{
        data: ExerciseEntity[];
        count: number;
    }>;
    findOne(id: string): Promise<ExerciseEntity>;
    update(id: string, updateExerciseDto: UpdateExerciseDto): Promise<ExerciseEntity>;
    makeExerciseInactive(id: string): Promise<ChangeStatusDto>;
    makeExerciseTrash(id: string): Promise<ChangeStatusDto>;
    makeExcersieActive(id: string): Promise<ChangeStatusDto>;
}
