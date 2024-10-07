import { Module } from '@nestjs/common';
import { NotificationscheduleService } from './notificationschedule.service';
import { NotificationscheduleController } from './notificationschedule.controller';

@Module({
  controllers: [NotificationscheduleController],
  providers: [NotificationscheduleService],
})
export class NotificationscheduleModule {}
