import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { ErrorManager } from '../helpers/errormanager';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  controllers: [MessagesController],
  providers: [MessagesService,ErrorManager],
})
export class MessagesModule {}
