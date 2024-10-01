import { Status } from "../types/status.enum";
export declare class CreateExerciseDto {
    name: string;
    description: string;
    urlVideoExample: string;
    benefits: string;
    tags: string;
    status: Status;
}
