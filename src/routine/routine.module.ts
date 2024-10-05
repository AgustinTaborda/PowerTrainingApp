import { Module } from '@nestjs/common';
import { UserRoutineLogService } from './routine.service';
import { UserRoutineLogController } from './routine.controller';

@Module({
  controllers: [UserRoutineLogController],
  providers: [UserRoutineLogService],
})
export class UserRoutineLogModule {}
