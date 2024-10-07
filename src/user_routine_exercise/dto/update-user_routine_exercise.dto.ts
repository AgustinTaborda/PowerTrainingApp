import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRoutineExerciseDto } from './create-user_routine_exercise.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRoutineExerciseDto extends PartialType(CreateUserRoutineExerciseDto) {
  @ApiProperty({
    example: true,
    description: 'Indica si el ejercicio está completado',
  })
  completed?: boolean;

  @ApiProperty({
    example: 7,
    description: 'Calificación de esfuerzo percibido (RPE)',
  })
  rpe?: number;
}
