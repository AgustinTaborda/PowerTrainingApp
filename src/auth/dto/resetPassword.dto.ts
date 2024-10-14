import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class ResetPasswordDto {
  
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user.' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456', description: 'The OTP sent to the user email.' })
  @IsString()
  @IsNotEmpty()
  otp: string;

  @ApiProperty({ example: 'newPassword123', description: 'The new password.' })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, {
    message: 'Password must be at least 8 characters long and contain both letters and numbers.',
  })
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({ example: 'newPassword123', description: 'Repeat the new password.' })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
