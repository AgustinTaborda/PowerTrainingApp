import { ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRoutineDto } from './create-routine.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateRoutineDto extends PartialType(CreateRoutineDto) {
  
  @ApiPropertyOptional({
    description: 'Nombre descriptivo de la rutina',
    example: 'Pecho y triceps',
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
    description: 'Indica si la rutina está completada o no',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
