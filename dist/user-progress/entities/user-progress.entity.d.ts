import { UserRoutineExerciseEntity } from 'src/user_routine_exercise/entities/user_routine_exercise.entity';
export declare class UserProgressEntity {
    id: number;
    userRoutineExercise: UserRoutineExerciseEntity;
    repetitions: number;
    weight: number;
    completed: boolean;
    rpe: number | null;
}
