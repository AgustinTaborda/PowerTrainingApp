import { Injectable } from '@nestjs/common';
import { CreateUserProgressDto } from './dto/create-user-progress.dto';
import { UpdateUserProgressDto } from './dto/update-user-progress.dto';

@Injectable()
export class UserProgressService {
  create(createUserProgressDto: CreateUserProgressDto) {
    return 'This action adds a new userProgress';
  }

  findAll() {
    return `This action returns all userProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userProgress`;
  }

  update(id: number, updateUserProgressDto: UpdateUserProgressDto) {
    return `This action updates a #${id} userProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} userProgress`;
  }
}
