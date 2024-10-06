import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserRoutineLogService } from './routine.service';
import { CreateUserRoutineLogDto } from './dto/create-routine.dto';
import { UpdateUserRoutineLogDto } from './dto/update-routine.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CombinedAuthGuard } from 'src/guards/google-jwtauth.guard';

@ApiTags('user-routine-log')
@ApiBearerAuth('access-token')
@UseGuards(CombinedAuthGuard) 
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
