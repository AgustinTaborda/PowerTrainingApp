import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from './roles.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async authSignIn(email: string, password: string) {
    const user: UserEntity = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    return this.generateToken(user);
  }

  async authSignInWithProvider(profile: any) {
    try {
      let user = await this.userRepository.findOne({
        where: { providerId: profile.providerId, provider: profile.provider },
      });

      if (!user) {
        user = await this.userRepository.findOne({
          where: { email: profile.email },
        });
      }

      if (!user) {
        const fullName = profile.name || '';
        const nameParts = fullName.split(' ');
        const firstName = nameParts.shift() || '';
        const lastName = nameParts.join(' ') || '';
        // Si el usuario no existe, lo creamos
        user = this.userRepository.create({
          email: profile.email,
          provider: profile.provider,
          providerId: profile.providerId,
          name: firstName,
          lastName: lastName,
          birthDay: profile.birthDay || new Date('1900-01-01'), //
          password: 'default_password',
        });
        await this.userRepository.save(user);
      } else {
        // Si el usuario ya existe, puedes actualizar su información si es necesario
        // user.name = profile.name;
        await this.userRepository.save(user);
      }

      return this.generateToken(user);
    } catch (error) {
      console.error('Error in authSignInWithProvider:', error);
      throw new UnauthorizedException('Error processing provider sign-in');
    }
  }

  private generateToken(user: UserEntity) {
    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(userPayload);

    return {
      success: 'User logged in successfully',
      token,
      userData: {
        sud: user.id,
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        birthDay: user.birthDay,
        role: user.role,
      },
    };
  }

  verifyToken(token: string): boolean {
    try {
      const payload = this.jwtService.verify(token);
      return !!payload; // Devuelve true si el token es válido
    } catch (error) {
      throw new UnauthorizedException('Token no válido');
    }
  }
}
