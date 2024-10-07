import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UserRoutineExerciseService } from './user_routine_exercise.service';
import { CreateUserRoutineExerciseDto } from './dto/create-user_routine_exercise.dto';
import { UserRoutineExerciseEntity } from './entities/user_routine_exercise.entity';
import { UpdateUserRoutineExerciseDto } from './dto/update-user_routine_exercise.dto';

@ApiTags('user-routine-exercises') 
@Controller('user-routine-exercises')
export class UserRoutineExerciseController {
  constructor(private readonly userRoutineExerciseService: UserRoutineExerciseService) {}

  @ApiOperation({ summary: 'Crear un nuevo ejercicio de rutina para un usuario' })
  @ApiResponse({ status: 201, description: 'El ejercicio de rutina fue creado con éxito', type: UserRoutineExerciseEntity })
  @ApiResponse({ status: 404, description: 'No se encontró el día de entrenamiento o ejercicio' })
  @Post()
  async create(@Body() createUserRoutineExerciseDto: CreateUserRoutineExerciseDto) {
    return this.userRoutineExerciseService.create(createUserRoutineExerciseDto);
  }

  @ApiOperation({ summary: 'Obtener todos los ejercicios de rutina de usuario con paginación' })
  @ApiQuery({ name: 'page', required: false, description: 'Numero de página', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Numero de items por página', type: Number })
  @ApiResponse({ status: 200, description: 'Lista de ejercicios de rutina de usuario', type: UserRoutineExerciseEntity, isArray: true })
  @ApiResponse({ status: 404, description: 'No se encontraron ejercicios de rutina' })
  @Get()
  async findAll(
    @Query('limit') limit: number = 10, 
    @Query('page') page: number = 1 
  ) {
    return this.userRoutineExerciseService.findAll(limit, page);
  }

  @ApiOperation({ summary: 'Obtener un ejercicio de rutina de usuario por ID' })
  @ApiResponse({ status: 200, description: 'Ejercicio de rutina de usuario encontrado', type: UserRoutineExerciseEntity })
  @ApiResponse({ status: 404, description: 'Ejercicio de rutina de usuario no encontrado' })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.userRoutineExerciseService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar un ejercicio de rutina de usuario por ID' })
  @ApiResponse({ status: 200, description: 'Ejercicio de rutina de usuario actualizado', type: UserRoutineExerciseEntity })
  @ApiResponse({ status: 404, description: 'Ejercicio de rutina de usuario no encontrado' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserRoutineExerciseDto: UpdateUserRoutineExerciseDto) {
    const userId = parseInt(id);
    return this.userRoutineExerciseService.update(userId, updateUserRoutineExerciseDto);
  }

  @ApiOperation({ summary: 'Eliminar un ejercicio de rutina de usuario por ID' })
  @ApiResponse({ status: 204, description: 'Ejercicio de rutina de usuario eliminado con éxito' })
  @ApiResponse({ status: 404, description: 'Ejercicio de rutina de usuario no encontrado' })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.userRoutineExerciseService.remove(id);
  }
}
