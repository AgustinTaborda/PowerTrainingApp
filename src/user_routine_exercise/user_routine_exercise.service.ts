import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingDayEntity } from 'src/training_day/entities/training_day.entity';
import { ExerciseEntity } from 'src/exercises/entities/exercise.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserRoutineExerciseEntity } from './entities/user_routine_exercise.entity';
import { CreateUserRoutineExerciseDto } from './dto/create-user_routine_exercise.dto';
import { UpdateUserRoutineExerciseDto } from './dto/update-user_routine_exercise.dto';

@Injectable()
export class UserRoutineExerciseService {
  constructor(
    @InjectRepository(UserRoutineExerciseEntity)
    private readonly userRoutineExerciseRepository: Repository<UserRoutineExerciseEntity>,

    @InjectRepository(TrainingDayEntity)
    private readonly trainingDayRepository: Repository<TrainingDayEntity>,

    @InjectRepository(ExerciseEntity)
    private readonly exerciseRepository: Repository<ExerciseEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Crear un nuevo UserRoutineExercise
  async create(createUserRoutineExerciseDto: CreateUserRoutineExerciseDto): Promise<UserRoutineExerciseEntity> {
    const { trainingDayId, exerciseId, ...rest } = createUserRoutineExerciseDto;

    const trainingDay = await this.trainingDayRepository.findOne({ where: { id: trainingDayId } });
    const exercise = await this.exerciseRepository.findOne({ where: { id: exerciseId } });    

    if (!trainingDay || !exercise) {
      throw new NotFoundException('TrainingDay o Exercise no encontrados');
    }

    const userRoutineExercise = this.userRoutineExerciseRepository.create({
      trainingDay,
      exercise,
      ...rest,
    });

    return await this.userRoutineExerciseRepository.save(userRoutineExercise);
  }

  // Obtener todos los ejercicios de rutina de usuario con paginación
  async findAll(limit: number, page: number): Promise<{ totalItems: number; totalPages: number; currentPage: number; items: UserRoutineExerciseEntity[] }> {
    const [items, total] = await this.userRoutineExerciseRepository.findAndCount({
      relations: ['trainingDay', 'exercise'],
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);
    
    return {
      totalItems: total,
      totalPages,
      currentPage: page,
      items,
    };
  }

  // Obtener un UserRoutineExercise por su ID
  async findOne(id: number): Promise<UserRoutineExerciseEntity> {
    const userRoutineExercise = await this.userRoutineExerciseRepository.findOne({
      where: { id },
      relations: ['trainingDay', 'exercise'],
    });
    console.log(userRoutineExercise);
    

    if (!userRoutineExercise) {
      throw new NotFoundException(`UserRoutineExercise con ID ${id} no encontrado`);
    }

    return userRoutineExercise;
  }

  // Actualizar un UserRoutineExercise
  async update(id: number, updateUserRoutineExerciseDto: UpdateUserRoutineExerciseDto): Promise<UserRoutineExerciseEntity> {
    const userRoutineExercise = await this.userRoutineExerciseRepository.preload({
      id,
      ...updateUserRoutineExerciseDto,
    });

    if (!userRoutineExercise) {
      throw new NotFoundException(`UserRoutineExercise con ID ${id} no encontrado`);
    }

    return await this.userRoutineExerciseRepository.save(userRoutineExercise);
  }

  // Eliminar un UserRoutineExercise
  async remove(id: number): Promise<void> {
    const userRoutineExercise = await this.findOne(id);
    await this.userRoutineExerciseRepository.remove(userRoutineExercise);
  }
}
