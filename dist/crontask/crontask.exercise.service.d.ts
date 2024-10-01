import { ExerciseEntity } from '../exercises/entities/exercise.entity';
import { Repository } from 'typeorm';
export declare class CronTasksService {
    private exercisesRepository;
    private readonly logger;
    private static readonly EVERY_3_MINUTES;
    constructor(exercisesRepository: Repository<ExerciseEntity>);
    handleCron(): void;
    moveTrashToInactive(): Promise<void>;
}
