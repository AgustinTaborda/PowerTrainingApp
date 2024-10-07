import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingDayEntity } from './entities/training_day.entity';
import { TrainingDayService } from './training_day.service';
import { TrainingDayController } from './training_day.controller';
import { RoutineEntity } from 'src/routine/entities/routine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingDayEntity, RoutineEntity])],
  controllers: [TrainingDayController],
  providers: [TrainingDayService],
})
export class TrainingDayModule {}
