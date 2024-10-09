import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutineService } from './routine.service';
import { RoutineEntity } from './entities/routine.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { RoutineController } from './routine.controller'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([RoutineEntity, UserEntity]), 
  ],
  providers: [RoutineService],
  controllers: [RoutineController], 
})
export class RoutineModule {}
