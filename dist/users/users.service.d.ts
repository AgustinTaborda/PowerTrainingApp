import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Role } from 'src/auth/roles.enum';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create(createUserDto: CreateUserDto): Promise<{
        password: string;
        name: string;
        lastName: string;
        birthDay: Date;
        email: string;
        role: Role;
    } & UserEntity>;
    findAll(limit: number, page: number): Promise<UserEntity[]>;
    findAllByFilters(filters: {
        name?: string;
        lastname?: string;
        birthday?: string;
        role?: string;
        email?: string;
    }, page?: number, limit?: number): Promise<{
        data: UserEntity[];
        count: number;
    }>;
    findOne(id: uuid): Promise<UserEntity>;
    update(id: uuid, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: uuid): Promise<import("typeorm").DeleteResult>;
    seedUsers(): Promise<void>;
}
