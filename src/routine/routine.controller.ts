import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, Query, ParseUUIDPipe } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CombinedAuthGuard } from 'src/guards/google-jwtauth.guard';

@ApiTags('ROUTINE')
@ApiBearerAuth('access-token')
@UseGuards(CombinedAuthGuard)
@Controller('routine')
export class RoutineController {
  constructor(private readonly routineService: RoutineService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new routine' })
  async create(@Body() createRoutineDto: CreateRoutineDto) {
    try {
      return await this.routineService.create(createRoutineDto);
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create routine');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all routines with pagination' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of results per page', type: Number })
  @ApiQuery({ name: 'page', required: false, description: 'Current page number', type: Number })
  async findAll(
    @Query('limit') limit: number = 10, 
    @Query('page') page: number = 1 
  ) {
    try {
      return await this.routineService.findAll(limit, page);
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to fetch routines');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a routine by ID' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.routineService.findOne(+id);
    } catch (error) {
      throw new BadRequestException(error.message || `Failed to fetch routine with ID ${id}`);
    }
  }
  
  @Get('/user/:userId')
  @ApiOperation({ summary: 'Get routines by User ID' })
  async findAllByUser(
    @Param('userId', new ParseUUIDPipe()) userId: string
  ) {
    try {
      return await this.routineService.findAllByUser(userId);
    } catch (error) {
      throw new BadRequestException(error.message || `Failed to fetch routines for the user ID ${userId}`);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a routine by ID' })
  async update(@Param('id') id: string, @Body() updateRoutineDto: UpdateRoutineDto) {
    try {
      return await this.routineService.update(+id, updateRoutineDto);
    } catch (error) {
      throw new BadRequestException(error.message || `Failed to update routine with ID ${id}`);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a routine by ID' })
  async remove(@Param('id') id: string) {
    try {
      return await this.routineService.remove(+id);
    } catch (error) {
      throw new BadRequestException(error.message || `Failed to delete routine with ID ${id}`);
    }
  }
}
