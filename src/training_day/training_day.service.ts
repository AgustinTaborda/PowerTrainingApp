import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrainingDayDto } from './dto/create-trainingday.dto';
import { UpdateTrainingDayDto } from './dto/update-trainingday.dto';
import { TrainingDayEntity } from './entities/training_day.entity';
import { RoutineEntity } from 'src/routine/entities/routine.entity';

@Injectable()
export class TrainingDayService {
  constructor(
    @InjectRepository(TrainingDayEntity)
    private readonly trainingDayRepository: Repository<TrainingDayEntity>,
    
    @InjectRepository(RoutineEntity)
    private readonly routineRepository: Repository<RoutineEntity>,
  ) {}

  async create(createTrainingDayDto: CreateTrainingDayDto): Promise<TrainingDayEntity> {
    try {
      const { routineId, date, description } = createTrainingDayDto;

      // Verificar que la rutina existe
      const routine = await this.routineRepository.findOneBy({ id: routineId });
      if (!routine) {
        throw new NotFoundException(`Routine with ID ${routineId} not found`);
      }

      // Crear y guardar el training day
      const trainingDay = this.trainingDayRepository.create({
        routine,
        date,
        description
      });

      return await this.trainingDayRepository.save(trainingDay);
    } catch (error) {
      throw new BadRequestException(`Error creating TrainingDay: ${error.message}`);
    }
  }

  async findAll(limit: number, page: number): Promise<TrainingDayEntity[]> {
    try {
      page = Math.max(1, Math.round(page));
      limit = Math.max(1, Math.round(limit));

      const trainingDays = await this.trainingDayRepository.find({
        take: limit,                               
        skip: (page - 1) * limit,                  
        relations: [                               
          'routine',                               
          'exercises',                             
          'exercises.exercise',                    
        ],
        order: { date: 'ASC' },                   
      });

      return trainingDays;
    } catch (error) {
      throw new BadRequestException(`Error fetching TrainingDays: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<TrainingDayEntity> {
    try {
      const trainingDay = await this.trainingDayRepository.findOne({
        where: { id },
        relations: [
          'routine',               // Relación con RoutineEntity
          'exercises',             // Relación con UserRoutineExerciseEntity
          'exercises.exercise',    // Relación anidada: UserRoutineExerciseEntity -> ExerciseEntity
        ],
      });
  
      if (!trainingDay) {
        throw new NotFoundException(`TrainingDay con ID ${id} no encontrado`);
      }
  
      return trainingDay;
    } catch (error) {
      throw new BadRequestException(`Error fetching TrainingDay with ID ${id}: ${error.message}`);
    }
  }

  async update(id: number, updateTrainingDayDto: UpdateTrainingDayDto): Promise<TrainingDayEntity> {
    try {
      const trainingDay = await this.trainingDayRepository.preload({
        id,
        ...updateTrainingDayDto,
      });

      if (!trainingDay) {
        throw new NotFoundException(`TrainingDay with ID ${id} not found`);
      }

      return await this.trainingDayRepository.save(trainingDay);
    } catch (error) {
      throw new BadRequestException(`Error updating TrainingDay with ID ${id}: ${error.message}`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const trainingDay = await this.trainingDayRepository.findOne({ where: { id } });

      if (!trainingDay) {
        throw new NotFoundException(`TrainingDay with ID ${id} not found`);
      }

      await this.trainingDayRepository.remove(trainingDay);
    } catch (error) {
      throw new BadRequestException(`Error deleting TrainingDay with ID ${id}: ${error.message}`);
    }
  }
}
