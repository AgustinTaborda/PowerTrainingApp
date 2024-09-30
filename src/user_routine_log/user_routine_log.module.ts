import { Module } from '@nestjs/common';
import { UserRoutineLogService } from './user_routine_log.service';
import { UserRoutineLogController } from './user_routine_log.controller';

@Module({
  controllers: [UserRoutineLogController],
  providers: [UserRoutineLogService],
})
export class UserRoutineLogModule {}
