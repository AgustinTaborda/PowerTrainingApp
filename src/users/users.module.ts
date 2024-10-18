import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { notificationSender } from '../mailer/routinesender.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
   
  //consumer.apply(requiresAuth()).forRoutes('/users/auth1');
  
  }
}
