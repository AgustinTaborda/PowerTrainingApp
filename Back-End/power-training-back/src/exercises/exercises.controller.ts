import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ExerciseEntity } from './entities/exercise.entity';
import { ExerciseSeed } from './exercises.seed';
//import { JwtAuthGuard } from 'src/guards/jwtauth.guard';

@ApiTags('exercises')
@Controller('exercises')
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

  @Get('/')
  @ApiOperation({ summary: 'Retrieve all excercises' }) 

  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'benefits', required: false, type: String })
  @ApiQuery({ name: 'tags', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, example: 5, description: 'Limite de items por página' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Número de página' })
  
  findAllByFilters(
    @Query('name') name?: string,
    @Query('benefits') benefits?: string,
    @Query('tags') tags?: string,
    @Query('page') page: number = 1,  // Página por defecto es 1
    @Query('limit') limit: number = 10 // Límite por defecto es 10
  ): Promise<{ data: ExerciseEntity[], count: number }> {

    return this.exercisesService.findAllByFilters({ name, benefits, tags }, page, limit);
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
  update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exercisesService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercisesService.remove(id);
  }

}
