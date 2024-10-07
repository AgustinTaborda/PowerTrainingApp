import { Injectable } from '@nestjs/common';
import { CreateNotificationscheduleDto } from './dto/create-notificationschedule.dto';
import { UpdateNotificationscheduleDto } from './dto/update-notificationschedule.dto';

@Injectable()
export class NotificationscheduleService {
  create(createNotificationscheduleDto: CreateNotificationscheduleDto) {
    return 'This action adds a new notificationschedule';
  }

  findAll() {
    return `This action returns all notificationschedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificationschedule`;
  }

  update(id: number, updateNotificationscheduleDto: UpdateNotificationscheduleDto) {
    return `This action updates a #${id} notificationschedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificationschedule`;
  }
}
