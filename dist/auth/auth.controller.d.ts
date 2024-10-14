import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { RequestOtp } from './dto/requestOtp.dto';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    authSignIn(credentials: CredentialsDto): Promise<{
        success: string;
        token: string;
        userData: {
            id: string;
            email: string;
            name: string;
            lastName: string;
            birthDay: Date;
            role: import("./roles.enum").Role;
        };
    }>;
    signInWithProvider(profile: any): Promise<{
        success: string;
        token: string;
        userData: {
            id: string;
            email: string;
            name: string;
            lastName: string;
            birthDay: Date;
            role: import("./roles.enum").Role;
        };
    }>;
    handleAuthRedirect2(req: Request): string | {
        userdata: Record<string, any>;
        token: string;
    };
    requestOtp(requestOtp: RequestOtp): Promise<string>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<string>;
}
