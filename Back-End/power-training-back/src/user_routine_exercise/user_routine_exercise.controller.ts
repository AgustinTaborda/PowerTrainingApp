import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserRoutineExerciseService } from './user_routine_exercise.service';
import { CreateUserRoutineExerciseDto } from './dto/create-user_routine_exercise.dto';
import { UpdateUserRoutineExerciseDto } from './dto/update-user_routine_exercise.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CombinedAuthGuard } from 'src/guards/google-jwtauth.guard';

@ApiTags('user-routine-exercise')
@ApiBearerAuth('access-token')
@UseGuards(CombinedAuthGuard) 
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
