import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseEntity } from './entities/exercise.entity';
import { Repository } from 'typeorm/repository/Repository';
import { v4 as uuid } from "uuid";

@Injectable()
export class ExercisesService {
  constructor(@InjectRepository(ExerciseEntity) private exercisesRepository: Repository<ExerciseEntity>) {}
  async create(createExerciseDto: CreateExerciseDto) {
    const exercise = this.exercisesRepository.create(createExerciseDto)
    return await this.exercisesRepository.save(exercise)
  }

//  async findAll({limit, page}): Promise<ExerciseEntity[]> {
//     page = Math.max(1, Math.round(page)); 
//     limit = Math.max(1, Math.round(limit)); 

//     const exercises: ExerciseEntity[] = await this.exercisesRepository.find({
//       take: limit,
//       skip: (page - 1) * limit,
//       order: { name: 'ASC' }
//     });
    
//     return exercises;
//   }

  async findAllByFilters(
    filters: { name?: string, benefits?: string, tags?: string },
    page: number = 1,  // Página actual, por defecto es la 1
    limit: number = 10 // Límite de resultados por página, por defecto 10
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
      
  
      // Paginación: definir el offset y el límite
      const offset = (page - 1) * limit;
      qb.skip(offset).take(limit);
  
      // Obtener los resultados y el total
      const [data, count] = await qb.getManyAndCount(); // Esto devuelve los resultados y el conteo total de registros
  
      return { data, count }; // Devolvemos los resultados y el total
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

 async findOne(id: uuid): Promise<ExerciseEntity> {
    const exercise = await this.exercisesRepository.findOne({ where: { id } });
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
    return exercise;
  }

  async update(id: uuid, updateExerciseDto: UpdateExerciseDto): Promise<ExerciseEntity> {
    const exercise = await this.exercisesRepository.findOne({ where: { id } });
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
    const updatedExercise = this.exercisesRepository.merge(exercise, updateExerciseDto);
    return this.exercisesRepository.save(updatedExercise); 
  }

  async remove(id: uuid) {
    const exercise = await this.exercisesRepository.findOne({ where: { id } });
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
    return await this.exercisesRepository.delete(id);
  }
}
