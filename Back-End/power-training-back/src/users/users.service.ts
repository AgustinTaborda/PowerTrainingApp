import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from "uuid";
import * as bcrypt from "bcrypt";

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
    filters: { name?: string, lastname?: string, birthday?: string, isadmin?: Boolean, email?: string },
    page: number = 1,  // Página actual, por defecto es la 1
    limit: number = 10 // Límite de resultados por página, por defecto 10
  ): Promise<{ data: UserEntity[], count: number }> {
    try {
      const qb = this.userRepository.createQueryBuilder('users');
      
      // Aplicar filtros dinámicos
      if (filters.name) {
        qb.andWhere('LOWER(users.name) = LOWER(:name)', { name: filters.name });
      }
  
      if (filters.lastname) {
        qb.andWhere('users.lastName = LOWER(:lastname)', { lastname: filters.lastname });
      }
  
      if (filters.birthday) {
        qb.andWhere('users.birthDay = :birthday', { birthday: filters.birthday });
      }
  
      if (filters.isadmin !== undefined) {
        qb.andWhere('users.isAdmin = :isadmin', { isadmin: filters.isadmin });
      }
  
      if (filters.email) {
        qb.andWhere('users.email = LOWER(:email)', { email: filters.email });
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
    

  async findOne(id: uuid) {
    return await this.userRepository.findOneBy({id});
  }

  async update(id: uuid, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: uuid) {
    return await this.userRepository.delete(id);
  }

  async seedUsers() {
    const users = [
      { subscriptionEndDate: '2025-09-15', birthDay: '1990-03-25', isAdmin: false, password: 'hashed_password1', name: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
      { subscriptionEndDate: '2024-11-20', birthDay: '1985-07-14', isAdmin: true, password: 'hashed_password2', name: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
      { subscriptionEndDate: '2026-01-30', birthDay: '2000-12-05', isAdmin: false, password: 'hashed_password3', name: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com' },
      { subscriptionEndDate: '2024-06-05', birthDay: '1995-05-22', isAdmin: true, password: 'hashed_password4', name: 'Alice', lastName: 'Williams', email: 'alice.williams@example.com' },
      { subscriptionEndDate: '2023-12-01', birthDay: '1988-09-10', isAdmin: false, password: 'hashed_password5', name: 'Charlie', lastName: 'Brown', email: 'charlie.brown@example.com' },
      { subscriptionEndDate: '2024-04-15', birthDay: '1992-04-11', isAdmin: false, password: 'hashed_password6', name: 'David', lastName: 'Wilson', email: 'david.wilson@example.com' },
      { subscriptionEndDate: '2025-08-24', birthDay: '1991-07-29', isAdmin: true, password: 'hashed_password7', name: 'Emma', lastName: 'Moore', email: 'emma.moore@example.com' },
      { subscriptionEndDate: '2025-03-18', birthDay: '1986-01-19', isAdmin: false, password: 'hashed_password8', name: 'Michael', lastName: 'Taylor', email: 'michael.taylor@example.com' },
      { subscriptionEndDate: '2026-10-12', birthDay: '1994-08-30', isAdmin: true, password: 'hashed_password9', name: 'Sarah', lastName: 'Anderson', email: 'sarah.anderson@example.com' },
      { subscriptionEndDate: '2024-09-05', birthDay: '1989-06-25', isAdmin: false, password: 'hashed_password10', name: 'James', lastName: 'Thomas', email: 'james.thomas@example.com' },
      { subscriptionEndDate: '2023-10-22', birthDay: '1993-11-14', isAdmin: false, password: 'hashed_password11', name: 'Emily', lastName: 'Jackson', email: 'emily.jackson@example.com' },
      { subscriptionEndDate: '2024-05-11', birthDay: '1996-02-15', isAdmin: true, password: 'hashed_password12', name: 'Olivia', lastName: 'White', email: 'olivia.white@example.com' },
      { subscriptionEndDate: '2025-12-19', birthDay: '1984-05-08', isAdmin: false, password: 'hashed_password13', name: 'William', lastName: 'Harris', email: 'william.harris@example.com' },
      { subscriptionEndDate: '2026-02-28', birthDay: '1997-03-03', isAdmin: true, password: 'hashed_password14', name: 'Sophia', lastName: 'Martin', email: 'sophia.martin@example.com' },
      { subscriptionEndDate: '2024-03-15', birthDay: '1990-09-17', isAdmin: false, password: 'hashed_password15', name: 'Benjamin', lastName: 'Lee', email: 'benjamin.lee@example.com' },
      { subscriptionEndDate: '2025-07-09', birthDay: '1987-10-25', isAdmin: false, password: 'hashed_password16', name: 'Isabella', lastName: 'Perez', email: 'isabella.perez@example.com' },
      { subscriptionEndDate: '2026-11-21', birthDay: '1998-12-01', isAdmin: true, password: 'hashed_password17', name: 'Henry', lastName: 'Thompson', email: 'henry.thompson@example.com' },
      { subscriptionEndDate: '2024-08-02', birthDay: '1991-03-10', isAdmin: false, password: 'hashed_password18', name: 'Mia', lastName: 'Garcia', email: 'mia.garcia@example.com' },
      { subscriptionEndDate: '2025-01-16', birthDay: '1992-11-27', isAdmin: true, password: 'hashed_password19', name: 'Alexander', lastName: 'Martinez', email: 'alexander.martinez@example.com' },
      { subscriptionEndDate: '2023-07-04', birthDay: '1989-04-02', isAdmin: false, password: 'hashed_password20', name: 'Lucas', lastName: 'Rodriguez', email: 'lucas.rodriguez@example.com' },
    ];

    for (const user of users) {
      const { subscriptionEndDate, isAdmin, birthDay, ...createUserDto } = user;
  
      const userBirthday: Date = new Date(birthDay); 

      await this.create({...createUserDto, birthDay: userBirthday}); 
    }
  }
}
