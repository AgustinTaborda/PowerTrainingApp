import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiProperty({ description: 'Recipient email address' , example: 'bainileonardo@gmail.com' })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Recipient email is required' })
  
  to: string;

  @ApiProperty({ description: 'Email subject' , example: 'Saludos desde Nest!' })
  @IsNotEmpty({ message: 'Email subject is required' })
  subject: string;

  @ApiProperty({ description: 'Email body text', example: 'Hola!' })
  @IsNotEmpty({ message: 'Email text is required' })
  text: string;
}
