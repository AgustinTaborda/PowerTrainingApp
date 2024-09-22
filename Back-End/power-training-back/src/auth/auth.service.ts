import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { Role } from "./roles.enum";

@Injectable()
export class AuthService{
    constructor (
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) {}
        
    async authSignIn(email:string, password:string) {
        const user: UserEntity = await this.userRepository.findOne({where: {email}})

        if (!user) {
            throw new UnauthorizedException('Email or password incorrect')
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            throw new UnauthorizedException('Email or password incorrect')
        }

        const userPayload = {
            sub: user.id,
            id: user.id,
            email: user.email,
            role: [user.isAdmin ? Role.Admin : Role.User]
        };        

        const token = this.jwtService.sign(userPayload)

        return {success: 'User logged in succesfully', token}
    }
        
}