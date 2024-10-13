import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Role } from './roles.enum';
import { MailService } from 'src/mailer/mailer.service';
export declare class AuthService {
    private userRepository;
    private readonly jwtService;
    private readonly mailService;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService, mailService: MailService);
    authSignIn(email: string, password: string): Promise<{
        success: string;
        token: string;
        userData: {
            sud: string;
            id: string;
            email: string;
            name: string;
            lastName: string;
            birthDay: Date;
            role: Role;
        };
    }>;
    authSignInWithProvider(profile: any): Promise<{
        success: string;
        token: string;
        userData: {
            sud: string;
            id: string;
            email: string;
            name: string;
            lastName: string;
            birthDay: Date;
            role: Role;
        };
    }>;
    private generateToken;
    verifyToken(token: string): boolean;
    generateOtp(email: string): Promise<string>;
}
