import { Inject, Injectable } from '@nestjs/common';
import { dailyNotificationDto } from './dto/daily.dto.notification';
import { weeklyNotificationDto } from './dto/weekly.dto.notification';
import { MonthlyNotificationDto } from './dto/monthly.dto.notification';
import { YearlyNotificationDto } from './dto/yearly.dto.notification';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationscheduleEntity } from './entities/notificationschedule.entity';
import { UserEntity } from '../users/entities/user.entity';
import { MessageEntity } from 'src/messages/entities/message.entity';
import { PeriodType } from './entities/notificationschedule.entity';
import { DateManager} from '../helpers/datemanager'



@Injectable()
export class NotificationscheduleService {
  constructor(
    @InjectRepository(NotificationscheduleEntity) 
    private readonly notificationScheduleRepository: Repository<NotificationscheduleEntity>,
   
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    @InjectRepository(MessageEntity)
    private readonly messageEntityRepository: Repository<MessageEntity>,
    private readonly dateManager:DateManager
) {}
  createYearly(createYearlyNotificationscheduleDto: YearlyNotificationDto) {
    throw new Error('Method not implemented.');
  }
  createMonthly(createMonthlyNotificationscheduleDto: MonthlyNotificationDto) {
    throw new Error('Method not implemented.');
  }
  createWeekly(createNotificationscheduleDto: weeklyNotificationDto) {
    throw new Error('Method not implemented.');
  }
  async createDaily(createdailyNotificationDto: dailyNotificationDto) {
   
    const user:UserEntity = await this.userEntityRepository.findOneBy({id:createdailyNotificationDto.userId})
    const message: MessageEntity = await this.messageEntityRepository.findOneBy({id:createdailyNotificationDto.messageId})
   
    createdailyNotificationDto.hour
    createdailyNotificationDto.minute
    const encodedHour = this.dateManager.encodeToHourSchedule(createdailyNotificationDto.hour,createdailyNotificationDto.minute)
    const nextSendDate = this.dateManager.calculateNextSendDate(encodedHour,PeriodType.DAY);

    

    const dailyNotification = this.notificationScheduleRepository.create({
      user,
      message,
      nextSendDate:nextSendDate,
      periodParam:encodedHour,
      periodType: PeriodType.DAY,

    } );


    return await this.notificationScheduleRepository.save(dailyNotification);
  
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
