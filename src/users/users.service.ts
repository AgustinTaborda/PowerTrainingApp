import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Role } from '../auth/roles.enum';
import { notificationSender } from '../mailer/routinesender.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class UsersService {
  notificationSender = new notificationSender();

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (user) {
        throw new BadRequestException('Email already in use');
      }

      const hashedPassword: string = await bcrypt.hash(createUserDto.password, 10);
      const dbUser = await this.userRepository.save({
        ...createUserDto,
        password: hashedPassword,
      });

      return dbUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: createAdminDto.email },
      });
      if (user) {
        throw new BadRequestException('Email already in use');
      }

      const hashedPassword: string = await bcrypt.hash(createAdminDto.password, 10);
      const dbAdmin = await this.userRepository.save({
        ...createAdminDto,
        password: hashedPassword,
        role: Role.Admin,
      });

      return dbAdmin;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(limit: number, page: number): Promise<UserEntity[]> {
    try {
      page = Math.max(1, Math.round(page));
      limit = Math.max(1, Math.round(limit));

      const users: UserEntity[] = await this.userRepository.find({
        take: limit,
        skip: (page - 1) * limit,
        order: { name: 'ASC' },
        relations: ['routines'],
      });

      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllByFilters(
    filters: {
      name?: string;
      lastname?: string;
      birthday?: string;
      role?: string;
      email?: string;
    },
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: UserEntity[]; count: number }> {
    try {
      const qb = this.userRepository.createQueryBuilder('users');
      qb.leftJoinAndSelect('users.routines', 'routines');

      if (filters.name) {
        qb.andWhere('LOWER(users.name) LIKE LOWER(:name)', { name: filters.name });
      }

      if (filters.lastname) {
        qb.andWhere('LOWER(users.lastName) LIKE LOWER(:lastname)', { lastname: filters.lastname });
      }

      if (filters.birthday) {
        qb.andWhere('users.birthDay = :birthday', { birthday: filters.birthday });
      }

      if (filters.role !== undefined) {
        qb.andWhere('users.role = :role', { role: filters.role });
      }

      if (filters.email) {
        qb.andWhere('LOWER(users.email) LIKE LOWER(:email)', { email: `%${filters.email}%` });
      }

      const offset = (page - 1) * limit;
      qb.skip(offset).take(limit);

      const [data, count] = await qb.getManyAndCount();
      return { data, count };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['routines'],
      });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneUser(id: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: uuid, updateUserDto: UpdateUserDto): Promise<void> {
    try {
      let user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new BadRequestException('User not found');
      }

      if (updateUserDto.password) {
        const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
        user.password = hashedPassword;
      }

      user = { ...user, ...updateUserDto };
      await this.userRepository.update(id, user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async changeOtp(email: string, otp: string, newPassword: string): Promise<string> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new BadRequestException('User not found');
      }

      if (user.resetOtp !== otp || user.otpExpiresAt < new Date()) {
        throw new BadRequestException('Invalid or expired OTP');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetOtp = null;
      user.otpExpiresAt = null;
      await this.userRepository.save(user);

      return 'Password changed successfully';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: uuid): Promise<void> {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new BadRequestException('User not found');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllRelated(): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.find({
        relations: ['payments', 'routines', 'subscriptions'],
      });
      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async receiveRoutineByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        relations: [
          'routines',
          'routines.trainingDays',
          'routines.trainingDays.exercises',
          'routines.trainingDays.exercises.exercise',
        ],
      });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      return this.notificationSender.receiveRoutineByemail(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async receiveRoutineByUUID(uuid: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: uuid },
        relations: [
          'routines',
          'routines.trainingDays',
          'routines.trainingDays.exercises',
          'routines.trainingDays.exercises.exercise',
        ],
      });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      return this.notificationSender.receiveRoutineByemail(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async seedUsers() {
    const users = [
      {
        subscriptionEndDate: '2025-09-15',
        birthDay: '1990-03-25',
        role: Role.Superadmin,
        password: 'hashed_password1',
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      },
      {
        subscriptionEndDate: '2024-11-20',
        birthDay: '1985-07-14',
        role: Role.Admin,
        password: 'hashed_password2',
        name: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
      },
      {
        subscriptionEndDate: '2026-01-30',
        birthDay: '2000-12-05',
        role: Role.User,
        password: 'hashed_password3',
        name: 'Bob',
        lastName: 'Johnson',
        email: 'bob.johnson@example.com',
      },
      {
        subscriptionEndDate: '2024-05-14',
        birthDay: '1995-02-18',
        role: Role.User,
        password: 'hashed_password4',
        name: 'Alice',
        lastName: 'Williams',
        email: 'alice.williams@example.com',
      },
      {
        subscriptionEndDate: '2025-07-20',
        birthDay: '1998-08-10',
        role: Role.User,
        password: 'hashed_password5',
        name: 'Charlie',
        lastName: 'Brown',
        email: 'charlie.brown@example.com',
      },
      {
        subscriptionEndDate: '2023-12-22',
        birthDay: '1992-11-25',
        role: Role.User,
        password: 'hashed_password6',
        name: 'David',
        lastName: 'Clark',
        email: 'david.clark@example.com',
      },
      {
        subscriptionEndDate: '2026-03-03',
        birthDay: '1996-05-15',
        role: Role.User,
        password: 'hashed_password7',
        name: 'Eve',
        lastName: 'Turner',
        email: 'eve.turner@example.com',
      },
      {
        subscriptionEndDate: '2025-11-11',
        birthDay: '1999-09-29',
        role: Role.User,
        password: 'hashed_password8',
        name: 'Frank',
        lastName: 'Moore',
        email: 'frank.moore@example.com',
      },
      {
        subscriptionEndDate: '2024-08-08',
        birthDay: '1997-03-30',
        role: Role.User,
        password: 'hashed_password9',
        name: 'Grace',
        lastName: 'Taylor',
        email: 'grace.taylor@example.com',
      },
      {
        subscriptionEndDate: '2025-02-17',
        birthDay: '1993-10-22',
        role: Role.User,
        password: 'hashed_password10',
        name: 'Hank',
        lastName: 'Anderson',
        email: 'hank.anderson@example.com',
      },
    ];

    for (const user of users) {
      const { subscriptionEndDate, birthDay, ...createUserDto } = user;

      const userBirthday: Date = new Date(birthDay);

      await this.create({ ...createUserDto, birthDay: userBirthday });
    }
  }
}
