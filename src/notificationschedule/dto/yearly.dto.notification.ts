import { ApiProperty } from "@nestjs/swagger";
import { v4 as uuid } from "uuid";

export class YearlyNotificationDto {
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
            example: 28,
            description: 'it can be a natural number beween 1 and 31, if month has less of 31 days, it will be calculate accordingly'

        })
        
    dateOfmonth: number;

    @ApiProperty(
        {
            example: 12,
            description: 'it can be a natural number beween 1 and 12'

        })
        
    monthNumber: number;


    @ApiProperty(
        {
            example: 21
        })
    hour: number;
    @ApiProperty({
            example: 45
    })
    minute: number;
}