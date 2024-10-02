import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Role } from './roles.enum';
export declare class AuthService {
    private userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService);
    authSignIn(email: string, password: string): Promise<{
        success: string;
        token: string;
        userData: {
            id: string;
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
            id: string;
            name: string;
            lastName: string;
            birthDay: Date;
            role: Role;
        };
    }>;
    private generateToken;
    verifyToken(token: string): boolean;
}
