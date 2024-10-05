import { TrainingDayEntity } from 'src/training_day/entities/training_day.entity';
import { ExerciseEntity } from 'src/exercises/entities/exercise.entity';
import { UserProgressEntity } from 'src/user-progress/entities/user-progress.entity';
export declare class UserRoutineExerciseEntity {
    id: number;
    trainingDay: TrainingDayEntity;
    exercise: ExerciseEntity;
    series: number;
    repetitions: number;
    weight: number;
    completed: boolean;
    logs: UserProgressEntity[];
}
