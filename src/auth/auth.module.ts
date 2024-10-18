import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { GoogleAuthGuard } from '../guards/google.guard';
import { MailService } from '../mailer/mailer.service';
//import { JwtAuthGuard } from '../guards/jwtauth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    UsersService,
    GoogleAuthGuard,
    MailService
   ],
  exports: []
})
export class AuthModule {}

