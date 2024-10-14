import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestOtp {
  
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user.' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
