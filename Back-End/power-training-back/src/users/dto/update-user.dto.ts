import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
//import { v4 as uuid } from "uuid";

export class UpdateUserDto extends PartialType(CreateUserDto) {
       /* @ApiProperty({
            description : "ID del usuario",
            example : "06b715e7-8b21-4398-a610-940e473f95e9"
        })
        id : string = uuid();
        */
       @ApiProperty({
        description : "Nombre del usuario",
        example : "Luis"
       }    
       )     
        name: string;
        @ApiProperty({
            description : "Apellidos del usuario",
            example : "Lopez"
        })   
        lastName: string;
        @ApiProperty({
            description : "Fecha de nacimiento del usuario",
            example : "2000-01-01"
        })    
        birthDay: Date;
        @ApiProperty({
            description : "Email del usuario",
            example : "luis@gmail.com"
        })   
        email: string;
        @ApiProperty({
            description : "Contraseña del usuario",
            example : "123456"
        })    
        password: string;
        @ApiProperty({
            description : "Si es administrador o no",
            example : "true"
        })
        isAdmin: boolean;
        @ApiProperty({
            description : "Fecha de finalización de la suscripción",
            example : "2022-01-01"
        })
        subscriptionEndDate: Date;
        

}
