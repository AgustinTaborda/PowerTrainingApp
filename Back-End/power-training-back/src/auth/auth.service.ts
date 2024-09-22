<<<<<<< Updated upstream
import { BadRequestException, Injectable } from "@nestjs/common";
import { UserEntity } from "../users/entities/user.entity";
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import * as bcrypt from 'bcrypt';
/*
@Injectable()
export class AuthService {

    constructor(
        private readonly userEntity : UserEntity,
        private readonly jwtService: JwtService
    ) { }


    async signUp(user: UserLoginDto) {
        if (user.password !== user.passwordConfirmation) {
            throw new BadRequestException('Passwords do not match');
        }
        const userBD = await this.userService.getUsersByEmail(user.email);
        if(userBD){
            throw new BadRequestException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        if(!hashedPassword){
            throw new BadRequestException('Password could not be hashed');
        }
        try {
            await this.userService.addUser({ ...user, password: hashedPassword });
            console.log(`User ${user.email} created successfully`);
            return { success: 'User created successfully!', user: user.email };
        } catch (error) {
            throw new BadRequestException(error);
        }

        

    }

    async signin(email: string, password: string) {
        if(!email || !password){
            throw new BadRequestException('Email and password are required');
        }
     //   console.log('email desde auth.service',email)
        const user = await this.userService.getUsersByEmail(email);
     //   console.log('user desde auth.service',user)
       if (!user){
        throw new BadRequestException('User not found!!!');
       }
       const isPasswordValid = await bcrypt.compare(password, user.password);
       if (!isPasswordValid){
        throw new BadRequestException('Wrong password');

     }
     const userPayload = {
        sub: user.id,// que es el subscriber? 
        id: user.id,
        email: user.email,
        //isAdmin: user.isAdmin, 
        roles: [user.isAdmin ? Role.ADMIN : Role.USER],//si es admin, el rol es ADMIN, si no es USER
     }
     
     const token = this.jwtService.sign(userPayload);
    // console.log('payload desde auth.service',userPayload)

    return {success: 'user logged in successfully',token};
}
}
*/

=======
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
>>>>>>> Stashed changes
