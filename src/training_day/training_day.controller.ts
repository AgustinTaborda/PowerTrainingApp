import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TrainingDayService } from './training_day.service';
import { CreateTrainingDayDto } from './dto/create-trainingday.dto';
import { UpdateTrainingDayDto } from './dto/update-trainingday.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TrainingDayEntity } from './entities/training_day.entity';

@ApiTags('Training Days')
@Controller('training-days')
export class TrainingDayController {
  constructor(private readonly trainingDayService: TrainingDayService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new training day' })
  @ApiResponse({ status: 201, description: 'Training day created successfully' })
  create(@Body() createTrainingDayDto: CreateTrainingDayDto) {
    return this.trainingDayService.create(createTrainingDayDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all training days with pagination' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page', type: Number })
  @ApiResponse({ status: 200, description: 'List of training days', type: [TrainingDayEntity] })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.trainingDayService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a training day by ID' })
  @ApiResponse({ status: 200, description: 'The found training day', type: TrainingDayEntity })
  @ApiResponse({ status: 404, description: 'Training day not found' })
  findOne(@Param('id') id: number) {
    return this.trainingDayService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a training day by ID' })
  @ApiResponse({ status: 200, description: 'Training day updated successfully', type: TrainingDayEntity })
  @ApiResponse({ status: 404, description: 'Training day not found' })
  update(@Param('id') id: number, @Body() updateTrainingDayDto: UpdateTrainingDayDto) {
    return this.trainingDayService.update(id, updateTrainingDayDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a training day by ID' })
  @ApiResponse({ status: 200, description: 'Training day deleted successfully' })
  @ApiResponse({ status: 404, description: 'Training day not found' })
  remove(@Param('id') id: number) {
    return this.trainingDayService.remove(id);
  }
}
