import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from "uuid";
import * as bcrypt from "bcrypt";
import { Role } from 'src/auth/roles.enum';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({where: {email: createUserDto.email}})
    if (user) {
      throw new BadRequestException('Email already in use')
    }

    const hashedPassword: string = await bcrypt.hash(createUserDto.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('Password could not be hashed')
    }

    const dbUser = await this.userRepository.save({...createUserDto, password: hashedPassword});
    if (!dbUser) {
      throw new BadRequestException('User could not be register correctly');
    }

    return dbUser
  }

  async findAll(limit:number, page:number) {
    page = Math.max(1, Math.round(page)); 
    limit = Math.max(1, Math.round(limit)); 

    const users: UserEntity[] = await this.userRepository.find({
      take: limit,
      skip: (page - 1) * limit,
      order: { name: 'ASC' }
    });
    
    return users;
  }
  

  async findAllByFilters(
    filters: { name?: string, lastname?: string, birthday?: string, role?: string, email?: string },
    page: number = 1,  // Página actual, por defecto es la 1
    limit: number = 10 // Límite de resultados por página, por defecto 10
  ): Promise<{ data: UserEntity[], count: number }> {
    try {
      const qb = this.userRepository.createQueryBuilder('users');
      
      // Aplicar filtros dinámicos
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
        qb.andWhere('LOWER(users.email) LIKE LOWER(:email)', { email:  `%${filters.email}%` });
      }
  
      // Paginación: definir el offset y el límite
      const offset = (page - 1) * limit;
      qb.skip(offset).take(limit);
  
      // Obtener los resultados y el total
      const [data, count] = await qb.getManyAndCount(); // Esto devuelve los resultados y el conteo total de registros
  
      return { data, count }; // Devolvemos los resultados y el total
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
      
    }
  }
    
  async findOne(id: string) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['routines']
    });
  }

  async update(id: uuid, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: uuid) {
    return await this.userRepository.delete(id);
  }

  async findAllRelated() {
   
    const users: UserEntity[] = await this.userRepository.find({
      relations: ['payments','routines','subscriptions']
    });
    
    return users;
  }
  

  async seedUsers() {
    const users = [
      { subscriptionEndDate: '2025-09-15', birthDay: '1990-03-25', role: Role.Superadmin, password: 'hashed_password1', name: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
      { subscriptionEndDate: '2024-11-20', birthDay: '1985-07-14', role: Role.Admin, password: 'hashed_password2', name: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
      { subscriptionEndDate: '2026-01-30', birthDay: '2000-12-05', role: Role.User, password: 'hashed_password3', name: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com' },
      { subscriptionEndDate: '2024-05-14', birthDay: '1995-02-18', role: Role.User, password: 'hashed_password4', name: 'Alice', lastName: 'Williams', email: 'alice.williams@example.com' },
      { subscriptionEndDate: '2025-07-20', birthDay: '1998-08-10', role: Role.User, password: 'hashed_password5', name: 'Charlie', lastName: 'Brown', email: 'charlie.brown@example.com' },
      { subscriptionEndDate: '2023-12-22', birthDay: '1992-11-25', role: Role.User, password: 'hashed_password6', name: 'David', lastName: 'Clark', email: 'david.clark@example.com' },
      { subscriptionEndDate: '2026-03-03', birthDay: '1996-05-15', role: Role.User, password: 'hashed_password7', name: 'Eve', lastName: 'Turner', email: 'eve.turner@example.com' },
      { subscriptionEndDate: '2025-11-11', birthDay: '1999-09-29', role: Role.User, password: 'hashed_password8', name: 'Frank', lastName: 'Moore', email: 'frank.moore@example.com' },
      { subscriptionEndDate: '2024-08-08', birthDay: '1997-03-30', role: Role.User, password: 'hashed_password9', name: 'Grace', lastName: 'Taylor', email: 'grace.taylor@example.com' },
      { subscriptionEndDate: '2025-02-17', birthDay: '1993-10-22', role: Role.User, password: 'hashed_password10', name: 'Hank', lastName: 'Anderson', email: 'hank.anderson@example.com' }
    ];    

    for (const user of users) {
      const { subscriptionEndDate, birthDay, ...createUserDto } = user;
  
      const userBirthday: Date = new Date(birthDay); 

      await this.create({...createUserDto, birthDay: userBirthday}); 
    }
  }
}
