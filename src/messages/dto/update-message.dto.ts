import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';
import { MessageEntity } from '../entities/message.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateMessageDto extends PartialType(MessageEntity) {

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
    body: string;


}
