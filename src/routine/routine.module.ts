import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutineService } from './routine.service';
import { RoutineEntity } from './entities/routine.entity';
import { UserEntity } from '../users/entities/user.entity';
import { RoutineController } from './routine.controller'; 
import { UsersService } from '../users/users.service';
import { ExerciseEntity } from 'src/exercises/entities/exercise.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoutineEntity, UserEntity, ExerciseEntity]), 
  ],
  providers: [RoutineService,UsersService, ],
  controllers: [RoutineController], 
})
export class RoutineModule {}
