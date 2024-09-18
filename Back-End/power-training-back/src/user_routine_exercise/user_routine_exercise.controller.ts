import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserRoutineExerciseService } from './user_routine_exercise.service';
import { CreateUserRoutineExerciseDto } from './dto/create-user_routine_exercise.dto';
import { UpdateUserRoutineExerciseDto } from './dto/update-user_routine_exercise.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user-routine-exercise')
@Controller('user-routine-exercise')
export class UserRoutineExerciseController {
  constructor(private readonly userRoutineExerciseService: UserRoutineExerciseService) {}

  @Post()
  create(@Body() createUserRoutineExerciseDto: CreateUserRoutineExerciseDto) {
    return this.userRoutineExerciseService.create(createUserRoutineExerciseDto);
  }

  @Get()
  findAll() {
    return this.userRoutineExerciseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRoutineExerciseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserRoutineExerciseDto: UpdateUserRoutineExerciseDto) {
    return this.userRoutineExerciseService.update(+id, updateUserRoutineExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRoutineExerciseService.remove(+id);
  }
}
