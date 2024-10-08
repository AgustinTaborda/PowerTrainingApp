import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseEntity } from '../exercises/entities/exercise.entity';
import { CronTasksService } from './crontask.exercise.service';




@Module({
  imports : [TypeOrmModule.forFeature([ExerciseEntity])],
  controllers: [],
  providers: [CronTasksService],
})
export class CronExercisesModule {}
