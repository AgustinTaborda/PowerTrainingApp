import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationscheduleService } from './notificationschedule.service';
import { CreateNotificationscheduleDto } from './dto/create-notificationschedule.dto';
import { UpdateNotificationscheduleDto } from './dto/update-notificationschedule.dto';

@Controller('notificationschedule')
export class NotificationscheduleController {
  constructor(private readonly notificationscheduleService: NotificationscheduleService) {}

  @Post()
  create(@Body() createNotificationscheduleDto: CreateNotificationscheduleDto) {
    return this.notificationscheduleService.create(createNotificationscheduleDto);
  }

  @Get()
  findAll() {
    return this.notificationscheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationscheduleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationscheduleDto: UpdateNotificationscheduleDto) {
    return this.notificationscheduleService.update(+id, updateNotificationscheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationscheduleService.remove(+id);
  }
}
