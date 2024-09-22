import { ApiProperty } from "@nestjs/swagger";
import { v4 as uuid } from "uuid";

export class CreateUserDto {
    
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
}
