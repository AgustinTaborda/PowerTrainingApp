import { Injectable } from '@nestjs/common';
import { CreateUserRoutineLogDto } from './dto/create-routine.dto';
import { UpdateUserRoutineLogDto } from './dto/update-routine.dto';

@Injectable()
export class UserRoutineLogService {
  create(createUserRoutineLogDto: CreateUserRoutineLogDto) {
    return 'This action adds a new userRoutineLog';
  }

  findAll() {
    return `This action returns all userRoutineLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRoutineLog`;
  }

  update(id: number, updateUserRoutineLogDto: UpdateUserRoutineLogDto) {
    return `This action updates a #${id} userRoutineLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRoutineLog`;
  }
}
