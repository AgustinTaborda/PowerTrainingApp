import { Module } from '@nestjs/common';
import { NotificationscheduleService } from './notificationschedule.service';
import { NotificationscheduleController } from './notificationschedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationscheduleEntity } from './entities/notificationschedule.entity';

import { UserEntity } from '../users/entities/user.entity';
import { MessageEntity } from '../messages/entities/message.entity';
import { DateManager } from '../helpers/datemanager';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationscheduleEntity,UserEntity,MessageEntity])],
  controllers: [NotificationscheduleController],
  providers: [NotificationscheduleService,DateManager],
})
export class NotificationscheduleModule {}
