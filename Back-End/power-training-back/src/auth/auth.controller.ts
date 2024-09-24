import { Controller, Post, Body, Get, Req, Redirect, HttpException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CredentialsDto } from './dto/credentials.dto';
import { Request } from 'express';
import { GoogleDto } from './dto/google.dto';
import { GoogleAuthGuard } from '../guards/google.guard';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService:AuthService,
    ) {}

    @Post('signin')
    authSignIn(@Body() credentials: CredentialsDto) {        
        const { email, password } = credentials;

        return this.authService.authSignIn(email, password);
    }
    @Post('signin/google')
    async authSignInGoogle(@Req() req: Request) {  
    if(req.oidc.isAuthenticated()) {
      console.log('req.oidc.isAuthenticated() es: '+req.oidc.isAuthenticated());
     const {sid,
        given_name,
        family_name,
        nickname,
        name,
        picture,   
        updated_at,
        email,
        email_verified,
        sub} = req.oidc.user

        const user = new GoogleDto();
        user.email = email;
        user.picture = picture;
        user.name = name;
        user.given_name = given_name;
        user.family_name = family_name;
        user.nickname = nickname;
        user.sid = sid;
        user.updated_at = updated_at; 
        user.email_verified = email_verified;
        user.sub = sub;
        console.log(req.oidc.idToken);
        await this.authService.signInGoogle(user);

       console.log(user);
     }else{
      //console.log('El estado del login en auth.controller.ts es '+req.oidc.isAuthenticated(), 401);
      console.log('No permission', 401);
      return new HttpException('No permission', 401);
        
     }

        
    }


    @Get('auth0-status')
    @Get()
       handleAuthRedirect2(@Req() req: Request) {
        if(req.oidc.isAuthenticated()) {
            return {userdata:req.oidc.user,token:req.oidc.idToken};
        }else{
            return 'El estado del login en auth.controller.ts es '+ req.oidc.isAuthenticated();
        }
       
    }
   
        @UseGuards(GoogleAuthGuard)
        @Get('protegida')
        getdata(@Req() req: Request) {           
         return {message:'Bienvenido,'+req.oidc.user.name+' estás autenticado con Google!'};
          
        }

}