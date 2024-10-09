import { ApiProperty, PartialType } from "@nestjs/swagger";
import { MessageEntity } from "../entities/message.entity";
import { IsNotEmpty } from "class-validator";

export class CreateMessageDto extends PartialType(MessageEntity){

    @ApiProperty(
        {
            example: 'Saludos de cumpleaños'
        }
    )
    @IsNotEmpty()
    name: string;

    @ApiProperty(
        {
            example: 'Feliz cumpleaños!!!'
        }
    )
    @IsNotEmpty()
    subject: string;    

   
    @ApiProperty({
        example: 'PowerTrainingapp le desea un muy feliz cumpleaños!!!'
    })
    @IsNotEmpty()
    body?: string;

}
