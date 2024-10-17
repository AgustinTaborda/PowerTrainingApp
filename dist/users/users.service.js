"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const roles_enum_1 = require("../auth/roles.enum");
const routinesender_service_1 = require("../mailer/routinesender.service");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.notificationSender = new routinesender_service_1.notificationSender();
    }
    async create(createUserDto) {
        const user = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });
        if (user) {
            throw new common_1.BadRequestException('Email already in use');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        if (!hashedPassword) {
            throw new common_1.BadRequestException('Password could not be hashed');
        }
        const dbUser = await this.userRepository.save({
            ...createUserDto,
            password: hashedPassword,
        });
        if (!dbUser) {
            throw new common_1.BadRequestException('User could not be register correctly');
        }
        return dbUser;
    }
    async createAdmin(createAdminDto) {
        const user = await this.userRepository.findOne({
            where: { email: createAdminDto.email },
        });
        if (user) {
            throw new common_1.BadRequestException('Email already in use');
        }
        const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
        if (!hashedPassword) {
            throw new common_1.BadRequestException('Password could not be hashed');
        }
        const dbAdmin = await this.userRepository.save({
            ...createAdminDto,
            password: hashedPassword,
            role: roles_enum_1.Role.Admin
        });
        if (!dbAdmin) {
            throw new common_1.BadRequestException('User could not be register correctly');
        }
        return dbAdmin;
    }
    async findAll(limit, page) {
        page = Math.max(1, Math.round(page));
        limit = Math.max(1, Math.round(limit));
        const users = await this.userRepository.find({
            take: limit,
            skip: (page - 1) * limit,
            order: { name: 'ASC' },
            relations: ['routines'],
        });
        return users;
    }
    async findAllByFilters(filters, page = 1, limit = 10) {
        try {
            const qb = this.userRepository.createQueryBuilder('users');
            qb.leftJoinAndSelect('users.routines', 'routines');
            if (filters.name) {
                qb.andWhere('LOWER(users.name) LIKE LOWER(:name)', {
                    name: filters.name,
                });
            }
            if (filters.lastname) {
                qb.andWhere('LOWER(users.lastName) LIKE LOWER(:lastname)', {
                    lastname: filters.lastname,
                });
            }
            if (filters.birthday) {
                qb.andWhere('users.birthDay = :birthday', {
                    birthday: filters.birthday,
                });
            }
            if (filters.role !== undefined) {
                qb.andWhere('users.role = :role', { role: filters.role });
            }
            if (filters.email) {
                qb.andWhere('LOWER(users.email) LIKE LOWER(:email)', {
                    email: `%${filters.email}%`,
                });
            }
            const offset = (page - 1) * limit;
            qb.skip(offset).take(limit);
            const [data, count] = await qb.getManyAndCount();
            return { data, count };
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findOne(id) {
        return await this.userRepository.findOne({
            where: { id },
            relations: ['routines'],
        });
    }
    async findOneUser(id) {
        return await this.userRepository.findOne({
            where: { id },
        });
    }
    async update(id, updateUserDto) {
        try {
            let user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new common_1.BadRequestException('User not found');
            }
            if (updateUserDto.password) {
                const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
                user.password = hashedPassword;
            }
            user = { ...user, ...updateUserDto };
            return await this.userRepository.update(id, user);
        }
        catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    async changeOtp(email, otp, newPassword) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        if (user.resetOtp !== otp || user.otpExpiresAt < new Date()) {
            throw new common_1.BadRequestException('Invalid or expired OTP');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = null;
        user.otpExpiresAt = null;
        await this.userRepository.save(user);
        return 'Password changed successfully';
    }
    async remove(id) {
        return await this.userRepository.delete(id);
    }
    async findAllRelated() {
        const users = await this.userRepository.find({
            relations: ['payments', 'routines', 'subscriptions'],
        });
        return users;
    }
    async receiveRoutineByemail(email) {
        const user = await this.userRepository.findOne({
            where: { email: email },
            relations: [
                'routines',
                'routines.trainingDays',
                'routines.trainingDays.exercises',
                'routines.trainingDays.exercises.exercise',
            ],
        });
        return this.notificationSender.receiveRoutineByemail(user);
    }
    async receiveRoutineByUUID(uuid) {
        const user = await this.userRepository.findOne({
            where: { id: uuid },
            relations: [
                'routines',
                'routines.trainingDays',
                'routines.trainingDays.exercises',
                'routines.trainingDays.exercises.exercise',
            ],
        });
        return this.notificationSender.receiveRoutineByemail(user);
    }
    async seedUsers() {
        const users = [
            {
                subscriptionEndDate: '2025-09-15',
                birthDay: '1990-03-25',
                role: roles_enum_1.Role.Superadmin,
                password: 'hashed_password1',
                name: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
            },
            {
                subscriptionEndDate: '2024-11-20',
                birthDay: '1985-07-14',
                role: roles_enum_1.Role.Admin,
                password: 'hashed_password2',
                name: 'Jane',
                lastName: 'Smith',
                email: 'jane.smith@example.com',
            },
            {
                subscriptionEndDate: '2026-01-30',
                birthDay: '2000-12-05',
                role: roles_enum_1.Role.User,
                password: 'hashed_password3',
                name: 'Bob',
                lastName: 'Johnson',
                email: 'bob.johnson@example.com',
            },
            {
                subscriptionEndDate: '2024-05-14',
                birthDay: '1995-02-18',
                role: roles_enum_1.Role.User,
                password: 'hashed_password4',
                name: 'Alice',
                lastName: 'Williams',
                email: 'alice.williams@example.com',
            },
            {
                subscriptionEndDate: '2025-07-20',
                birthDay: '1998-08-10',
                role: roles_enum_1.Role.User,
                password: 'hashed_password5',
                name: 'Charlie',
                lastName: 'Brown',
                email: 'charlie.brown@example.com',
            },
            {
                subscriptionEndDate: '2023-12-22',
                birthDay: '1992-11-25',
                role: roles_enum_1.Role.User,
                password: 'hashed_password6',
                name: 'David',
                lastName: 'Clark',
                email: 'david.clark@example.com',
            },
            {
                subscriptionEndDate: '2026-03-03',
                birthDay: '1996-05-15',
                role: roles_enum_1.Role.User,
                password: 'hashed_password7',
                name: 'Eve',
                lastName: 'Turner',
                email: 'eve.turner@example.com',
            },
            {
                subscriptionEndDate: '2025-11-11',
                birthDay: '1999-09-29',
                role: roles_enum_1.Role.User,
                password: 'hashed_password8',
                name: 'Frank',
                lastName: 'Moore',
                email: 'frank.moore@example.com',
            },
            {
                subscriptionEndDate: '2024-08-08',
                birthDay: '1997-03-30',
                role: roles_enum_1.Role.User,
                password: 'hashed_password9',
                name: 'Grace',
                lastName: 'Taylor',
                email: 'grace.taylor@example.com',
            },
            {
                subscriptionEndDate: '2025-02-17',
                birthDay: '1993-10-22',
                role: roles_enum_1.Role.User,
                password: 'hashed_password10',
                name: 'Hank',
                lastName: 'Anderson',
                email: 'hank.anderson@example.com',
            },
        ];
        for (const user of users) {
            const { subscriptionEndDate, birthDay, ...createUserDto } = user;
            const userBirthday = new Date(birthDay);
            await this.create({ ...createUserDto, birthDay: userBirthday });
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map