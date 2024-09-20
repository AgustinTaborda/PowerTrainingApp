import { Injectable, NotFoundException } from '@nestjs/common';
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

 async findAll() {
    return await this.exercisesRepository.find();
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
