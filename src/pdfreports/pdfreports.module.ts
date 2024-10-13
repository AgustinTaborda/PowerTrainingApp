import { Module } from '@nestjs/common';
import { PdfreportsService } from './pdfreports.service';
import { PdfreportsController } from './pdfreports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { ExerciseEntity } from '../exercises/entities/exercise.entity';
import { SubscriptionEntity } from '../subscriptions/entities/subscription.entity';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,ExerciseEntity,SubscriptionEntity])],
  controllers: [PdfreportsController],
  providers: [PdfreportsService],
})
export class PdfreportsModule {}
