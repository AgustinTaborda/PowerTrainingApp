import { ApiProperty } from "@nestjs/swagger";
import { v4 as uuid } from "uuid";

export class dailyNotificationDto {
    @ApiProperty(
        {
            example: 'c471c07a-2354-4f31-908b-f181679753f1'
        })
    userId: string= uuid();

    @ApiProperty(
        {
            example: 'c571c07a-2354-4f31-908b-f181679753f3'
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