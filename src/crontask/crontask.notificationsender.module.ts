import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationscheduleEntity } from '../notificationschedule/entities/notificationschedule.entity';
import { CronTasksNotificationSender } from './crontask.notificationsender.service';
import { UsersModule } from 'src/users/users.module';
import { UserEntity } from '../users/entities/user.entity';
import { MailService } from '../mailer/mailer.service';
import { DateManager } from '../helpers/datemanager';




@Module({
  imports : [TypeOrmModule.forFeature([NotificationscheduleEntity])],
  controllers: [],
  providers: [CronTasksNotificationSender,MailService,DateManager],
})
export class CronNotificationsenderModule {}
