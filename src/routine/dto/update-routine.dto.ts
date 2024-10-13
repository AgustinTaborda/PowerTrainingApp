import { ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRoutineDto } from './create-routine.dto';
import { IsBoolean, IsOptional, IsString, IsNotEmpty, IsDate } from 'class-validator';

export class UpdateRoutineDto extends PartialType(CreateRoutineDto) {
  
  @ApiPropertyOptional({
    description: 'Indica el nombre de la rutina',
    example: 'Rutina de ejemplo',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Descripción o comentarios adicionales sobre la rutina',
    example: 'Actualización: Añadido un enfoque en cardio para los días de descanso.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Fecha de inicio de la rutina',
    example: '2024-10-01',
  })
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @ApiPropertyOptional({
    description: 'Fecha de finalización de la rutina',
    example: '2024-10-07',
  })
  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @ApiPropertyOptional({
    description: 'Indica si la rutina está completada o no',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
