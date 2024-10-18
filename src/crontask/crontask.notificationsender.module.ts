import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationscheduleEntity } from '../notificationschedule/entities/notificationschedule.entity';
import { CronTasksNotificationSender } from './crontask.notificationsender.service';
import { UserEntity } from '../users/entities/user.entity';
import { MailService } from '../mailer/mailer.service';
import { DateManager } from '../helpers/datemanager';
import { RoutineEntity } from '../routine/entities/routine.entity';
import { UsersService } from '../users/users.service';




@Module({
  imports : [TypeOrmModule.forFeature([NotificationscheduleEntity,UserEntity,RoutineEntity])],
  controllers: [],
  providers: [CronTasksNotificationSender,MailService,DateManager,UsersService],
})
export class CronNotificationsenderModule {}
