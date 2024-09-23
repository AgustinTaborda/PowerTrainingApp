import { Controller, Post, Body, Get, Req, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CredentialsDto } from './dto/credentials.dto';
import { Request } from 'express';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService:AuthService,
    ) {}

    // @ApiBody({
    //     description: 'Ingresar los datos del nuevo usuario',
    //     type: CreateUserWithConfirmationDto
    // })
    // @HttpCode(HttpStatus.CREATED)
    // @Post('signup')
    // authSignUp(@Body() createUser:CreateUserWithConfirmationDto) {
    //     const {password, passwordConfirmation, ...userDtoWithoutPassword} = createUser;
        
    //     if (password !== passwordConfirmation) {
    //         throw new BadRequestException('Password do not match');
    //     }
    //     return this.authService.authSignUp({password, ...userDtoWithoutPassword})
    // }

    @Post('signin')
    authSignIn(@Body() credentials: CredentialsDto) {        
        const { email, password } = credentials;

        return this.authService.authSignIn(email, password);
    }
/*

    @Get('auth0-login')
      
    async handleAuthRedirect() {
      // Aquí puedes acceder a process.env.BASE_URL y devolver la URL
      const baseUrl = process.env.BASE_URL //|| 'http://localhost:3000'; // Fallback a localhost
      return  await fetch(`${baseUrl}/login`, { method: 'POST' });
    }
      */
   


    @Get('auth0-status')
    @Get()
       handleAuthRedirect2(@Req() req: Request) {
        if(req.oidc.isAuthenticated()) {
            return {userdata:req.oidc.user,token:req.oidc.idToken};
        }else{
            return 'El estado del login en auth.controller.ts es '+ req.oidc.isAuthenticated();
        }
       
    }
    /*@Redirect(`${process.env.BASE_URL}/login`, 302) 
    auth0Login(@Req() req: Request) {
       // console.log('El estado del login en auth.controller.ts es '+ req.oidc.isAuthenticated());
       console.log(`${process.env.BASE_URL}/login`);
       console.log(req.oidc.user);
       return req.oidc.user;
      //  return 'El estado del login en auth.controller.ts es '+ req.oidc.isAuthenticated();
    }*/

    /*
    @Get('auth0-logout')
    async auth0LogOut(@Req() req: Request) {
        // Aquí puedes acceder a process.env.BASE_URL y devolver la URL
        const baseUrl = process.env.BASE_URL //|| 'http://localhost:3000'; // Fallback a localhost
        await fetch(`${baseUrl}/logout`, { method: 'POST' });
        return {authenticated: req.oidc.isAuthenticated()}
      }
        */
        
        

}