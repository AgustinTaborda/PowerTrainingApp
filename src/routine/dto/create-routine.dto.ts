import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID, IsBoolean, ValidateNested, IsArray } from 'class-validator';

export class CreateRoutineDto {
  @ApiProperty({
    description: 'ID del usuario al que está asociada la rutina',
    example: 'e9b1b6e0-5117-4f70-82a8-1a34de9f9d38',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiPropertyOptional({
    description: 'Indica el nombre de la rutina',
    example: 'Rutina de ejemplo',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Fecha de inicio de la rutina',
    example: '2024-10-01',
  })
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    description: 'Fecha de finalización de la rutina',
    example: '2024-10-07',
  })
  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({
    description: 'Indica si la rutina está completada o no',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @ApiPropertyOptional({
    description: 'Descripción o comentarios adicionales sobre la rutina',
    example: 'Rutina semanal enfocada en la fuerza de piernas y espalda.',
  })
  @IsString()
  @IsOptional()
  description?: string;

//   @ApiProperty({
//     description: 'Días de entrenamiento dentro de la rutina',
//     type: [CreateTrainingDayDto],
//   })
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => CreateTrainingDayDto)
//   trainingDays: CreateTrainingDayDto[];
}
