import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { MailService } from '../mailer/mailer.service';
import { SendEmailDto } from './dto/sendemaildto';
export declare class NotificationsController {
    private readonly notificationsService;
    private readonly mailService;
    constructor(notificationsService: NotificationsService, mailService: MailService);
    create(createNotificationDto: CreateNotificationDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateNotificationDto: UpdateNotificationDto): string;
    remove(id: string): string;
    sendEmail(body: SendEmailDto): Promise<{
        message: string;
    }>;
}
