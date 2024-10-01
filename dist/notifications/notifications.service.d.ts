import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsService {
    create(createNotificationDto: CreateNotificationDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateNotificationDto: UpdateNotificationDto): string;
    remove(id: number): string;
}
