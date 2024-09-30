import { v4 as uuid } from "uuid";
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';
import { Status } from '../types/status.enum';
import { ExerciseEntity } from "../entities/exercise.entity";

export class ChangeStatusDto {
  @ApiProperty()
  @IsString()
  id: string = uuid();

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsEnum(Status)
  status: Status;
}

// Si quieres una versión parcial
export class PartialExerciseDTO extends PartialType(ExerciseEntity) {}