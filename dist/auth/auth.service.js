"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const uuid_1 = require("uuid");
const mailer_service_1 = require("../mailer/mailer.service");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, mailService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async authSignIn(email, password) {
        const user = await this.userRepository.findOne({
            where: { email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Email or password incorrect');
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new common_1.UnauthorizedException('Email or password incorrect');
        }
        return this.generateToken(user);
    }
    async authSignInWithProvider(profile) {
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
                user = this.userRepository.create({
                    email: profile.email,
                    provider: profile.provider,
                    providerId: profile.providerId,
                    name: firstName,
                    lastName: lastName,
                    birthDay: profile.birthDay || new Date('1900-01-01'),
                    password: 'default_password',
                });
                await this.userRepository.save(user);
            }
            else {
                await this.userRepository.save(user);
            }
            return this.generateToken(user);
        }
        catch (error) {
            console.error('Error in authSignInWithProvider:', error);
            throw new common_1.UnauthorizedException('Error processing provider sign-in');
        }
    }
    generateToken(user) {
        const userPayload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        const token = this.jwtService.sign(userPayload);
        return {
            success: 'User logged in successfully',
            token,
            userData: {
                id: user.id,
                email: user.email,
                name: user.name,
                lastName: user.lastName,
                birthDay: user.birthDay,
                role: user.role,
                isSubscribed: user.isSubscribed,
            },
        };
    }
    verifyToken(token) {
        try {
            const payload = this.jwtService.verify(token);
            return !!payload;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Token no válido');
        }
    }
    async generateOtp(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException(`User with email ${email} not found`);
        }
        const otp = (0, uuid_1.v4)().slice(0, 6);
        user.resetOtp = otp;
        user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await this.userRepository.save(user);
        await this.mailService.sendEmail(email, 'One time password', `This is your one-time password: ${otp}, then you will have to choose your new password.`);
        return 'OTP sent';
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        mailer_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map