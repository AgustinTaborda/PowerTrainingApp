import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
 import { v4 as uuid } from "uuid";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

    async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
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

  async findOne(id: uuid) {
    return await this.userRepository.findOneBy({id});
  }

  async update(id: uuid, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: uuid) {
    return await this.userRepository.delete(id);
  }
}
