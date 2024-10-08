import { ApiProperty, PartialType } from "@nestjs/swagger";
import { v4 as uuid } from "uuid";
import { NotificationscheduleEntity } from "../entities/notificationschedule.entity";

export class dailyNotificationDto extends PartialType(NotificationscheduleEntity) {

      @ApiProperty(
        {
            example: '03578b28-9b12-451d-b6da-23934ed85bce'
        })
    userId: string= uuid();

    @ApiProperty(
        {
            example: '5906e7c0-ece7-4eff-867a-0c1cf5e1ae02'
        })
    messageId: string= uuid();

    @ApiProperty(
        {
            example: 8
        })
    hour: number;
    @ApiProperty({
            example: 30
    })
    minute: number;
}