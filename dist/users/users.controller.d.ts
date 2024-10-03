import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Response } from 'express';
import { Role } from 'src/auth/roles.enum';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    seedUsers(): Promise<{
        message: string;
    }>;
    create(createUserDto: CreateUserDto): Promise<{
        password: string;
        name: string;
        lastName: string;
        birthDay: Date;
        email: string;
        role: Role;
    } & UserEntity>;
    logout(res: Response): void;
    findAll(limit?: number, page?: number): Promise<UserEntity[]>;
    findAllByFilters(name?: string, lastname?: string, birthday?: string, role?: string, email?: string, page?: number, limit?: number): Promise<{
        data: UserEntity[];
        count: number;
    }>;
    findOne(id: string): Promise<UserEntity>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
