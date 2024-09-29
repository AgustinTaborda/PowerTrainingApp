import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class JWTAuthGuard implements CanActivate{

    constructor(
        private readonly jwtService:JwtService
    ) {}
    
    async canActivate(
            context: ExecutionContext
        ): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = request.header('authorization')?.split(' ')[1] ?? '';   
        
        if (!token) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        try {            
            const payload = await this.jwtService.verifyAsync(token, { 
                secret: process.env.JWT_SECRET
            });            

            // payload.roles = ['Admin'];
            payload.iat = new Date(payload.iat * 1000);
            payload.exp = new Date(payload.exp * 1000);
            request.user = payload;
            return true
        } catch (error) {
            throw new UnauthorizedException('Invalid token')
        }
    }

}