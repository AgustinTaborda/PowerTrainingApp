import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { RoutineEntity } from './entities/routine.entity';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { ExerciseEntity } from 'src/exercises/entities/exercise.entity';

@Injectable()
export class RoutineService {
  constructor(
    @InjectRepository(RoutineEntity)
    private readonly routineRepository: Repository<RoutineEntity>,
    
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @Inject(UsersService)
    private readonly usersService: UsersService,

    @InjectRepository(ExerciseEntity) 
    private readonly exerciseRepository: Repository<ExerciseEntity>
  ) {}

  // Crear una nueva rutina
  async create(createRoutineDto: CreateRoutineDto): Promise<RoutineEntity> {
    try {
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
      // await this.usersService.receiveRoutineByemail(user.email);
      return routine;
    } catch (error) {
      throw new BadRequestException(`Error creating routine: ${error.message}`);
    }
  }

  // Obtener todas las rutinas con paginación y relaciones
  async findAll(limit: number, page: number): Promise<{ totalItems: number; totalPages: number; currentPage: number; items: RoutineEntity[] }> {
    try {
      const [routines, total] = await this.routineRepository.findAndCount({
        relations: ['user', 'trainingDays', 'trainingDays.exercises', 'trainingDays.exercises.exercise'],
        select: {
          user: {
            id: true,
          },
        },
        take: limit,          
        skip: (page - 1) * limit, // Calcular el offset para la paginación
      });

      const totalPages = Math.ceil(total / limit); // Calcular el número total de páginas

      return {
        totalItems: total,
        totalPages,
        currentPage: page,
        items: routines,
      };
    } catch (error) {
      throw new BadRequestException(`Error fetching routines: ${error.message}`);
    }
  }

  // Obtener una rutina por ID
  async findOne(id: number): Promise<RoutineEntity> {
    try {
      const routine = await this.routineRepository.findOne({ 
        where: { id },
        relations: ['user', 'trainingDays', 'trainingDays.exercises', 'trainingDays.exercises.exercise'],
      });

      if (!routine) {
        throw new NotFoundException(`Routine with ID ${id} not found`);
      }
      return routine;
    } catch (error) {
      throw new BadRequestException(`Error fetching routine with ID ${id}: ${error.message}`);
    }
  }

  // Actualizar una rutina
  async update(id: number, updateRoutineDto: UpdateRoutineDto): Promise<RoutineEntity> {
    try {
      const routine = await this.routineRepository.preload({
        id,
        ...updateRoutineDto,
      });

      if (!routine) {
        throw new NotFoundException(`Routine with ID ${id} not found`);
      }

      return await this.routineRepository.save(routine);
    } catch (error) {
      throw new BadRequestException(`Error updating routine with ID ${id}: ${error.message}`);
    }
  }

  // Eliminar una rutina
  async remove(id: number): Promise<void> {
    try {
      const routine = await this.routineRepository.findOne({ where: { id } });

      if (!routine) {
        throw new NotFoundException(`Routine with ID ${id} not found`);
      }

      await this.routineRepository.remove(routine);
    } catch (error) {
      throw new BadRequestException(`Error deleting routine with ID ${id}: ${error.message}`);
    }
  }

  // Obtener rutinas por ID de usuario
  async findByUserId(id: string): Promise<RoutineEntity[]> {
    try {
      return await this.routineRepository.find({
        where: { user: { id } },
        relations: ['user', 'trainingDays', 'trainingDays.exercises', 'trainingDays.exercises.exercise'],
      });
    } catch (error) {
      throw new BadRequestException(`Error fetching routines for user with ID ${id}: ${error.message}`);
    }
  }

  // Obtener estadísticas
  async getStatistics(): Promise<{ users: number; routines: number; exercises: number }> {
    try {
      const totalUsers = await this.userRepository.count();
      const totalRoutines = await this.routineRepository.count();
      const totalExercises = await this.exerciseRepository.count();

      return {
        users: totalUsers,
        routines: totalRoutines,
        exercises: totalExercises,
      };
    } catch (error) {
      console.error('Error in getStatistics:', error);
      throw new BadRequestException('Failed to retrieve statistics');
    }
  }
}
