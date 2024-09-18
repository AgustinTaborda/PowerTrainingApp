import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserRoutineLogService } from './user_routine_log.service';
import { CreateUserRoutineLogDto } from './dto/create-user_routine_log.dto';
import { UpdateUserRoutineLogDto } from './dto/update-user_routine_log.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user-routine-log')
@Controller('user-routine-log')
export class UserRoutineLogController {
  constructor(private readonly userRoutineLogService: UserRoutineLogService) {}

  @Post()
  create(@Body() createUserRoutineLogDto: CreateUserRoutineLogDto) {
    return this.userRoutineLogService.create(createUserRoutineLogDto);
  }

  @Get()
  findAll() {
    return this.userRoutineLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRoutineLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserRoutineLogDto: UpdateUserRoutineLogDto) {
    return this.userRoutineLogService.update(+id, updateUserRoutineLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRoutineLogService.remove(+id);
  }
}
