import { IsUUID, IsDateString, IsOptional, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoutineExerciseEntity } from 'src/user_routine_exercise/entities/user_routine_exercise.entity';

export class CreateTrainingDayDto {
  @ApiProperty({ example: 'day 1', description: 'Day of the training day' })
  @IsDateString()
  date: string;
  
  @ApiProperty({ example: 'dia de piernas', description: 'Description of Day of the training day' })
  @IsDateString()
  description: string;

  // @ApiProperty({ example: '', description: 'Id of the exercises for the training day or empty' })
  // @IsArray()
  // exercises: UserRoutineExerciseEntity[];

  @ApiProperty({ example: '1', description: 'The routine ID associated with the training day' })
  @IsUUID()
  routineId: number;
}
