import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CredentialsDto } from './dto/credentials.dto';
import { Request } from 'express';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
