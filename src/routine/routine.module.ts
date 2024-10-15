import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutineService } from './routine.service';
import { RoutineEntity } from './entities/routine.entity';
import { UserEntity } from '../users/entities/user.entity';
import { RoutineController } from './routine.controller'; 
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoutineEntity, UserEntity]), 
  ],
  providers: [RoutineService,UsersService],
  controllers: [RoutineController], 
})
export class RoutineModule {}
