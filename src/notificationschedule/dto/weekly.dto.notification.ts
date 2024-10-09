import { ApiProperty } from "@nestjs/swagger";
import { v4 as uuid } from "uuid";

export class WeeklyNotificationDto {
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
            example: 1,
            description: 'Lunes: 1, Martes: 2, Miercoles: 3, Jueves: 4, Viernes: 5, Sabado: 6, Domingo: 7'

        })
        
    dayOfweek: number;

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