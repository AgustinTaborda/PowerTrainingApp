import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CredentialsDto } from './dto/credentials.dto';

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
}