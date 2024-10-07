import { PartialType } from '@nestjs/swagger';
import { CreateNotificationscheduleDto } from './create-notificationschedule.dto';

export class UpdateNotificationscheduleDto extends PartialType(CreateNotificationscheduleDto) {}
