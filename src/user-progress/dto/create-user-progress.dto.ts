import { PartialType } from "@nestjs/mapped-types";
import { UserProgressEntity } from "../entities/user-progress.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserProgressDto extends PartialType(UserProgressEntity){

    @ApiProperty()
    @IsNotEmpty()
    repetitions: number;

    @ApiProperty()
    @IsNotEmpty()
    weight: number; 

    @ApiProperty()
    @IsNotEmpty()
    completed: boolean;     

    @ApiProperty()
    @IsNotEmpty()
    rpe: number;

    @ApiProperty()
    @IsNotEmpty()
    photoUrl: string;

    @ApiProperty()  
    @IsNotEmpty()
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    exerciseId: string;

    @ApiProperty()
    @IsNotEmpty()
    date: Date;

    @ApiProperty()
    @IsNotEmpty()
    time: Date;

}
