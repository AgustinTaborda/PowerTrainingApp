import { Controller, Post, Body, Get, Req, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CredentialsDto } from './dto/credentials.dto';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { RequestOtp } from './dto/requestOtp.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    ) {}

  @Post('signin')
  authSignIn(@Body() credentials: CredentialsDto) {
    const { email, password } = credentials;
    return this.authService.authSignIn(email, password);
  }

  @Post('signin-provider')
  async signInWithProvider(@Body() profile: any) {
    try {
      return await this.authService.authSignInWithProvider(profile);
    } catch (error) {
      console.error('Error in signInWithProvider:', error);
      throw new Error('Internal server error');
    }
  }

  @Get('auth0-status')
  handleAuthRedirect2(@Req() req: Request) {
    if (req.oidc.isAuthenticated()) {
      return { userdata: req.oidc.user, token: req.oidc.idToken };
    } else {
      return (
        'El estado del login en auth.controller.ts es ' +
        req.oidc.isAuthenticated()
      );
    }
  }

  @Post('request-otp')
  @ApiOperation({ summary: 'Request an OTP to reset password' })
  async requestOtp(@Body() requestOtp: RequestOtp) {
    const { email } = requestOtp
    return await this.authService.generateOtp(email);
  }

  @Post('reset')
  @ApiOperation({ summary: 'Reset password using OTP' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const { email, otp, newPassword, confirmPassword } = resetPasswordDto;

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    return await this.userService.changeOtp(email, otp, newPassword);
  }
}
