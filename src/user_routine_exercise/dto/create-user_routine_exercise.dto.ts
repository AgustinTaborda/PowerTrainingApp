import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';
// import { ExerciseEntity } from 'src/exercises/entities/exercise.entity';

export class CreateUserRoutineExerciseDto {
  @ApiProperty({ example: 1, description: 'ID del día de entrenamiento al que pertenece este ejercicio' })
  @IsInt()
  @IsNotEmpty()
  trainingDayId: number;

  @ApiProperty({ example: '69494573-5127-40bf-bb7c-1daa94986f8c', description: 'UUID del ejercicio que se va a realizar' })
  @IsNotEmpty()
  exerciseId: string;

  @ApiProperty({ example: 4, description: 'Número de series a realizar' })
  @IsInt()
  @IsNotEmpty()
  series: number;

  @ApiProperty({ example: 12, description: 'Número de repeticiones por serie' })
  @IsInt()
  @IsNotEmpty()
  repetitions: number;

  @ApiPropertyOptional({ example: 45.5, description: 'Peso levantado durante el ejercicio (opcional)' })
  @IsNumber({}, { message: 'El peso debe ser un número' })
  @IsOptional()
  weight?: number;

  @ApiPropertyOptional({ example: false, description: 'Indica si el ejercicio fue completado o no' })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;

//   @ApiProperty({ example: 1, description: 'ID del usuario que está realizando el ejercicio' })
//   @IsInt()
//   @IsNotEmpty()
//   userId: number;
}
