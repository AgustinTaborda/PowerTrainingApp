import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationscheduleService } from './notificationschedule.service';
import { dailyNotificationDto } from './dto/daily.dto.notification';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MonthlyNotificationDto } from './dto/monthly.dto.notification';
import { YearlyNotificationDto } from './dto/yearly.dto.notification';
import { WeeklyNotificationDto } from './dto/weekly.dto.notification';

@ApiTags('NOTIFICATIONS SCHEDULE')

@Controller('notificationschedule')
export class NotificationscheduleController {
  constructor(private readonly notificationscheduleService: NotificationscheduleService) {}

  @Post('/create/daily')
  
  @ApiOperation({
    summary: 'You can schedule a message for a user that will be sent every day', 
    description: 'Valids minutes are from 0 to 59, and hours from 0 to 23',
    externalDocs: {
      url: 'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
    }
    })
  createDaily(@Body() createNotificationscheduleDto: dailyNotificationDto) {
    return this.notificationscheduleService.createDaily(createNotificationscheduleDto);
  }

  @ApiOperation({
   summary: 'You can schedule a message for a user that will be sent every week', 
   description: 'For setting day ok week, use this guide Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6, Sunday: 7',
   externalDocs: {
     url: 'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
   }

   }) 
  @Post('/create/weekly')
  createWeekly(@Body() createWeeklyNotificationscheduleDto: WeeklyNotificationDto) {
    return this.notificationscheduleService.createWeekly(createWeeklyNotificationscheduleDto);
  }

  @ApiOperation({
    summary: 'You can schedule a message for a user that will be sent every month', 
    description: 'it can be a natural number beween 1 and 31, if month has less of 31 days, it will be calculate accordingly',
    externalDocs: {
      url: 'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
    }
 
    }) 
  @Post('/create/monthly')
  createMonthly(@Body() createMonthlyNotificationscheduleDto: MonthlyNotificationDto) {
    return this.notificationscheduleService.createMonthly(createMonthlyNotificationscheduleDto);
  }

  @ApiOperation({
    summary: 'You can schedule a message for a user that will be sent every month', 
    description: 'it can be a natural number beween 1 and 31, if month has less of 31 days, it will be calculate accordingly',
    externalDocs: {
      url: 'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
    }
 
    }) 
  @Post('/create/yearly')
  createYearly(@Body() createYearlyNotificationscheduleDto: YearlyNotificationDto) {
    return this.notificationscheduleService.createYearly(createYearlyNotificationscheduleDto);
  }

  
  @Get()
  findAll() {
    return this.notificationscheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationscheduleService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationscheduleService.remove(id);
  }
    
}
