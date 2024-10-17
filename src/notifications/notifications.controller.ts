import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MailService } from '../mailer/mailer.service';
import { SendEmailDto } from './dto/sendemaildto';

@ApiTags('NOTIFICATIONS')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService,
    private readonly mailService: MailService
  ) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }

  @ApiOperation({ summary: 'Send email' }) 
  @Post('/send-email')
  async sendEmail(@Body() body:  SendEmailDto) {
    const { to, subject, text } = body;
    await this.mailService.sendEmail(to, subject, text);
    return { message: 'Email sent' };
  }
}
