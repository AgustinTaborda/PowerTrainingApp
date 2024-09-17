import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { CreateUserProgressDto } from './dto/create-user-progress.dto';
import { UpdateUserProgressDto } from './dto/update-user-progress.dto';

@Controller('user-progress')
export class UserProgressController {
  constructor(private readonly userProgressService: UserProgressService) {}

  @Post()
  create(@Body() createUserProgressDto: CreateUserProgressDto) {
    return this.userProgressService.create(createUserProgressDto);
  }

  @Get()
  findAll() {
    return this.userProgressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userProgressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserProgressDto: UpdateUserProgressDto) {
    return this.userProgressService.update(+id, updateUserProgressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userProgressService.remove(+id);
  }
}
