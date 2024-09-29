import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ExerciseEntity } from './entities/exercise.entity';
import { ExerciseSeed } from './exercises.seed';
import { Auth0TokenGuard } from '../guards/auth0.guard';
import { Status } from './types/status.enum';
import { ChangeStatusDto } from './dto/change-status.dto';
import { JWTAuthGuard } from 'src/guards/jwtauth.guard';

@ApiTags('exercises')
@Controller('exercises')
@ApiBearerAuth('access-token')
@UseGuards(JWTAuthGuard) 
export class ExercisesController {
  constructor(
    private readonly exercisesService: ExercisesService,
    private readonly exerciseSeed: ExerciseSeed
    
  ) {}

  @Post('/seed')
  seedExercises() {
    return this.exerciseSeed.seedExercises();
  }
  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  // @Get()
  // @ApiQuery({ name: 'limit', required: false, example: 5, description: 'Limite de items por página' })
  // @ApiQuery({ name: 'page', required: false, example: 1, description: 'Número de página' })
  // findAll(
  //       @Query('limit') limit: number = 5,
  //       @Query('page') page: number = 1
  //       ) {
  //   return this.exercisesService.findAll({limit, page});
  // }
 //@UseGuards(new Auth0TokenGuard())
  @Get('/')
  @ApiOperation({ summary: 'Retrieve all excercises' }) 

  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'benefits', required: false, type: String })
  @ApiQuery({ name: 'tags', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, enum: Status , description: 'Filter by status (active, inactive, trash)'})
  @ApiQuery({ name: 'limit', required: false, example: 5, description: 'Limite de items por página' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Número de página' })
  
  findAllByFilters(
    @Query('name') name?: string,
    @Query('benefits') benefits?: string,
    @Query('tags') tags?: string,
    @Query('status') status?: string,
    @Query('page') page: number = 1,  // Página por defecto es 1
    @Query('limit') limit: number = 10 // Límite por defecto es 10
  ): Promise<{ data: ExerciseEntity[], count: number }> {
    console.log(status)
    return this.exercisesService.findAllByFilters({ name, benefits, tags, status }, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exercisesService.findOne(id);
  }
  /*@UseGuards(JwtAuthGuard) // Aplica el guardia a esta ruta
  @Get('/protected')
  test() {
    return 'este es un recurso protegido';
  }*/

  @Patch(':id')
  @ApiOperation({ summary: 'You can update exercises, remember only 3 types of status lowercase active or inactive or trash' }) 
  update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exercisesService.update(id, updateExerciseDto);
  }

  /* Deshabilitado para poder hacer borrado lógico
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercisesService.remove(id);
  }*/

  //PATCH /exercises/{id}/inactive
  @Patch(':id/inactive')
  @ApiOperation({ summary: 'Update exercise status to inactive' })  
  async makeExerciseInactive(@Param('id') id: string): Promise<ChangeStatusDto> {
    return await this.exercisesService.changeStatus(id, Status.INACTIVE);
  }
  //PATCH /exercises/{id}/trash
  @Patch(':id/trash')
  @ApiOperation({ summary: 'Update exercise status to trash' })
  async makeExerciseTrash(@Param('id') id: string): Promise<ChangeStatusDto> {
    return await this.exercisesService.changeStatus(id, Status.TRASH);
  }
  //PATCH /exercises/{id}/active
  @Patch(':id/active')
  @ApiOperation({ summary: 'Update exercise status to active' })
  async makeExcersieActive(@Param('id') id: string): Promise<ChangeStatusDto> {
    return await this.exercisesService.changeStatus(id, Status.ACTIVE);
  }

}
