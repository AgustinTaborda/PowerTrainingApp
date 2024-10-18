import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseEntity } from './entities/exercise.entity';
import { Repository } from 'typeorm/repository/Repository';
import { v4 as uuid } from "uuid";
import { Status } from './types/status.enum';
import { ChangeStatusDto } from './dto/change-status.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(ExerciseEntity) 
    private exercisesRepository: Repository<ExerciseEntity>
  ) {}

  // Cambiar el estado de un ejercicio
  async changeStatus(id: string, status: Status): Promise<ChangeStatusDto> {
    try {
      let exercise = await this.exercisesRepository.findOne({ where: { id } });
      if (!exercise) {
        throw new NotFoundException(`Exercise with ID ${id} not found`);
      }

      const result = await this.exercisesRepository.update(id, { status });

      if (result.affected === 0) {
        throw new HttpException(`Failed to update exercise with ID ${id}`, HttpStatus.BAD_REQUEST);
      }

      exercise = await this.exercisesRepository.findOneBy({ id });

      return {
        id: exercise.id,
        status: exercise.status,
        description: exercise.description,
      };
    } catch (error) {
      throw new HttpException(
        'An error occurred while updating the exercise: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Crear un nuevo ejercicio
  async create(createExerciseDto: CreateExerciseDto): Promise<ExerciseEntity> {
    try {
      const exercise = this.exercisesRepository.create(createExerciseDto);
      return await this.exercisesRepository.save(exercise);
    } catch (error) {
      throw new HttpException('Error creating exercise: ' + error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Buscar ejercicios con filtros y paginación
  async findAllByFilters(
    filters: { name?: string, benefits?: string, tags?: string, status?: string },
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: ExerciseEntity[], count: number }> {
    try {
      const qb = this.exercisesRepository.createQueryBuilder('exercises');

      // Aplicar filtros dinámicos
      if (filters.name) {
        qb.andWhere('LOWER(exercises.name) LIKE LOWER(:name)', { name: `%${filters.name}%` });
      }
      if (filters.benefits) {
        qb.andWhere('LOWER(exercises.benefits) LIKE LOWER(:benefits)', { benefits: `%${filters.benefits}%` });
      }
      if (filters.tags) {
        qb.andWhere('LOWER(exercises.tags) LIKE LOWER(:tags)', { tags: `%${filters.tags}%` });
      }
      if (filters.status) {
        qb.andWhere('exercises.status = :status', { status: filters.status });
      }

      // Paginación
      const offset = (page - 1) * limit;
      qb.skip(offset).take(limit);

      // Obtener los resultados y el total
      const [data, count] = await qb.getManyAndCount();

      return { data, count };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error fetching exercises: ' + error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Buscar un ejercicio por ID
  async findOne(id: uuid): Promise<ExerciseEntity> {
    try {
      const exercise = await this.exercisesRepository.findOne({ where: { id } });
      if (!exercise) {
        throw new NotFoundException(`Exercise with ID ${id} not found`);
      }
      return exercise;
    } catch (error) {
      throw new HttpException('Error fetching exercise with ID ' + id + ': ' + error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Actualizar un ejercicio
  async update(id: uuid, updateExerciseDto: UpdateExerciseDto): Promise<ExerciseEntity> {
    try {
      const exercise = await this.exercisesRepository.findOne({ where: { id } });
      if (!exercise) {
        throw new NotFoundException(`Exercise with ID ${id} not found`);
      }

      const updatedExercise = this.exercisesRepository.merge(exercise, updateExerciseDto);
      return await this.exercisesRepository.save(updatedExercise);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException('An error occurred while updating the exercise: ' + error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Eliminar un ejercicio
  async remove(id: uuid): Promise<void> {
    try {
      const exercise = await this.exercisesRepository.findOne({ where: { id } });
      if (!exercise) {
        throw new NotFoundException(`Exercise with ID ${id} not found`);
      }
      await this.exercisesRepository.delete(id);
    } catch (error) {
      throw new HttpException('Error deleting exercise with ID ' + id + ': ' + error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
