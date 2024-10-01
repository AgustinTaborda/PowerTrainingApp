import { Status } from '../types/status.enum';
import { ExerciseEntity } from "../entities/exercise.entity";
export declare class ChangeStatusDto {
    id: string;
    description: string;
    status: Status;
}
declare const PartialExerciseDTO_base: import("@nestjs/common").Type<Partial<ExerciseEntity>>;
export declare class PartialExerciseDTO extends PartialExerciseDTO_base {
}
export {};
