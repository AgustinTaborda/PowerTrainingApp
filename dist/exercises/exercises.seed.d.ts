import { DataSource } from 'typeorm';
import { ExerciseEntity } from './entities/exercise.entity';
export declare class ExerciseSeed {
    private dataSource;
    constructor(dataSource: DataSource);
    seedExercises(): Promise<ExerciseEntity[]>;
}
