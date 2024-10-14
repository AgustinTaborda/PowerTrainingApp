import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { RoutineEntity } from './entities/routine.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class RoutineService {
  constructor(
    @InjectRepository(RoutineEntity)
    private readonly routineRepository: Repository<RoutineEntity>,
    
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Crear una nueva rutina
  async create(createRoutineDto: CreateRoutineDto) {
    const { userId, name, startDate, endDate, description } = createRoutineDto;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const routine = this.routineRepository.create({
      user,
      name,
      startDate,
      endDate,
      description,
      completed: false, 
    });

    await this.routineRepository.save(routine);
    return routine;
  }

  // Obtener todas las rutinas con paginación y relaciones
  async findAll(limit: number, page: number) {
    const [routines, total] = await this.routineRepository.findAndCount({
      // relations: ['user', 'trainingDays', 'userRoutineExercises', 'userRoutineExercises.exercise'],
      relations: ['user', 'trainingDays', 'trainingDays.exercises', 'trainingDays.exercises.exercise'],
      select: {
        user: {
          id: true,
        },
      },
      take: limit,          // Limitar el número de resultados
      skip: (page - 1) * limit, // Calcular el offset para la paginación
    });

    const totalPages = Math.ceil(total / limit); // Calcular el número total de páginas

    return {
      totalItems: total,
      totalPages,
      currentPage: page,
      items: routines,
    };
  }

  // Obtener una rutina por ID
  async findOne(id: number) {
    const routine = await this.routineRepository.findOne({ 
      where: { id },
      relations: ['user', 'trainingDays', 'trainingDays.exercises', 'trainingDays.exercises.exercise']
    });
    if (!routine) {
      throw new NotFoundException(`Routine with ID ${id} not found`);
    }
    return routine;
  }

  // Actualizar una rutina
  async update(id: number, updateRoutineDto: UpdateRoutineDto) {
    const routine = await this.routineRepository.preload({
      id,
      ...updateRoutineDto,
    });

    if (!routine) {
      throw new NotFoundException(`Routine with ID ${id} not found`);
    }

    return await this.routineRepository.save(routine);
  }

  // Eliminar una rutina
  async remove(id: number) {
    const routine = await this.routineRepository.findOne({ where: { id } });

    if (!routine) {
      throw new NotFoundException(`Routine with ID ${id} not found`);
    }

    return await this.routineRepository.remove(routine);
  }
}
