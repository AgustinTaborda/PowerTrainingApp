import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
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
            isAdmin: boolean;
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
            isAdmin: boolean;
        };
    }>;
    private generateToken;
    verifyToken(token: string): boolean;
}
