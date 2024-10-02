import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    authSignIn(credentials: CredentialsDto): Promise<{
        success: string;
        token: string;
        userData: {
            id: string;
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
}
