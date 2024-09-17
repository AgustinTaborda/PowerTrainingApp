import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';

@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @Post()
  create(@Body() createRoutineDto: CreateRoutineDto) {
    return this.routinesService.create(createRoutineDto);
  }

  @Get()
  findAll() {
    return this.routinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routinesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoutineDto: UpdateRoutineDto) {
    return this.routinesService.update(+id, updateRoutineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routinesService.remove(+id);
  }
}
