import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { GoogleAuthGuard } from '../guards/google.guard';
//import { JwtAuthGuard } from '../guards/jwtauth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService,GoogleAuthGuard ],
  exports: []
})
export class AuthModule {}

