import { Module } from '@nestjs/common';
import { PdfreportsService } from './pdfreports.service';
import { PdfreportsController } from './pdfreports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { ExerciseEntity } from '../exercises/entities/exercise.entity';
import { SubscriptionEntity } from '../subscriptions/entities/subscription.entity';
import { PDFToolkitService } from './pdfreports.tutorial';
import { RoutineEntity } from 'src/routine/entities/routine.entity';
import { TrainingDayEntity } from 'src/training_day/entities/training_day.entity';


@Module({
  imports: [TypeOrmModule.forFeature([
    UserEntity,
    ExerciseEntity,
    SubscriptionEntity, 
    RoutineEntity, 
    TrainingDayEntity
  ])],
  controllers: [PdfreportsController],
  providers: [PdfreportsService,PDFToolkitService],
})
export class PdfreportsModule {}
