import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationscheduleEntity } from '../notificationschedule/entities/notificationschedule.entity';
import { CronTasksNotificationSender } from './crontask.notificationsender.service';




@Module({
  imports : [TypeOrmModule.forFeature([NotificationscheduleEntity])],
  controllers: [],
  providers: [CronTasksNotificationSender],
})
export class CronExercisesModule {}
