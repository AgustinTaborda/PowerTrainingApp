import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageEntity } from './entities/message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from '../helpers/errormanager';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @Inject(ErrorManager)
    private readonly errorManager: ErrorManager
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    try {
      const message = this.messageRepository.create(createMessageDto);
      return await this.messageRepository.save(message);
      
    } catch (error) {
      throw new HttpException('Error creating message :'+error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      
    }
    
   
  }

  async findAll() {
    try {
      return await this.messageRepository.find();
    } catch (error) {
      throw new HttpException('Error finding messages :'+error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      return await this.messageRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException('Error finding message :'+error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    try {
      await this.messageRepository.update(id, updateMessageDto);
      return {statuscode:201,  message: 'Message updated successfully'}
    } catch (error) {
      throw new HttpException('Error updating message :'+error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
   
    try {
      
      const result = await this.messageRepository.delete(id);
      this.errorManager.deleteErrorManager(id, result);
    } catch (error) {
      throw new HttpException('Error deleting message :'+error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      
    }
   
     
       
  }
}
