import { ApiProperty } from "@nestjs/swagger";

export class UserLoginDto {
    @ApiProperty({
        description : 'El email del usuario',
        example : 'sunombre@dominio.com'
    })
    email: string;
    @ApiProperty({
        description : 'La contraseña del usuario',
        example : '12345'
    })
    password: string;
}