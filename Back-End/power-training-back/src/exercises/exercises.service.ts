import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseEntity } from './entities/exercise.entity';
import { Repository } from 'typeorm/repository/Repository';
import { v4 as uuid } from "uuid";

@Injectable()
export class ExercisesService {
  constructor(@InjectRepository(ExerciseEntity) private exerciseRepository: Repository<ExerciseEntity>) {}
  async create(createExerciseDto: CreateExerciseDto) {
    const exercise = this.exerciseRepository.create(createExerciseDto)
    return await this.exerciseRepository.save(exercise)
  }

 async findAll() {
    return await this.exerciseRepository.find();
  }

 async findOne(id: uuid) {
    return await this.exerciseRepository.findOneBy({id});
  }

  async update(id: uuid, updateExerciseDto: UpdateExerciseDto) {
    return await this.exerciseRepository.update(id, updateExerciseDto);
  }

  async remove(id: uuid) {
    return await this.exerciseRepository.delete(id);
  }
}
