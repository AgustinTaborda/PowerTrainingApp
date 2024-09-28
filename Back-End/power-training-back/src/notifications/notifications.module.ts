import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { MailService } from '../mailer/mailer.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService,MailService],
})
export class NotificationsModule {}
