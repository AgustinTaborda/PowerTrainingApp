import { Injectable } from '@nestjs/common';
import { dailyNotificationDto } from './dto/daily.dto.notification';
import { weeklyNotificationDto } from './dto/weekly.dto.notification';
import { MonthlyNotificationDto } from './dto/monthly.dto.notification';
import { YearlyNotificationDto } from './dto/yearly.dto.notification';


@Injectable()
export class NotificationscheduleService {
  createYearly(createYearlyNotificationscheduleDto: YearlyNotificationDto) {
    throw new Error('Method not implemented.');
  }
  createMonthly(createMonthlyNotificationscheduleDto: MonthlyNotificationDto) {
    throw new Error('Method not implemented.');
  }
  createWeekly(createNotificationscheduleDto: weeklyNotificationDto) {
    throw new Error('Method not implemented.');
  }
  createDaily(createdailyNotificationDto: dailyNotificationDto) {
    return 'This action adds a new notificationschedule';
  }

  findAll() {
    return `This action returns all notificationschedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificationschedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificationschedule`;
  }
}
