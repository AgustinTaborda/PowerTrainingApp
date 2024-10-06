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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CombinedAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwt = require("jsonwebtoken");
const axios_1 = require("axios");
const jwkToPem = require("jwk-to-pem");
let CombinedAuthGuard = class CombinedAuthGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const isTest = false;
        if (isTest) {
            const token = request.header('authorization')?.split(' ')[1] ?? '';
            if (!token) {
                throw new common_1.UnauthorizedException('Authorization header is missing');
            }
            try {
                const payload = await this.jwtService.verifyAsync(token, {
                    secret: process.env.JWT_SECRET,
                });
                request.user = payload;
                return true;
            }
            catch (err) {
                console.log('No es un JWT válido, intentando Google...');
            }
            try {
                const decodedHeader = jwt.decode(token, { complete: true })?.header;
                const kid = decodedHeader?.kid;
                if (!kid) {
                    throw new common_1.UnauthorizedException('Token inválido, no tiene kid');
                }
                const googleKeys = await this.getGooglePublicKeys();
                const jwk = googleKeys.keys.find(key => key.kid === kid);
                if (!jwk) {
                    throw new common_1.UnauthorizedException('No se encontró la clave pública correspondiente');
                }
                const publicKey = jwkToPem(jwk);
                const decodedGoogleToken = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
                request.user = decodedGoogleToken;
                return true;
            }
            catch (err) {
                console.log('Token inválido', err);
                throw new common_1.UnauthorizedException('Invalid token');
            }
        }
        else {
            return true;
        }
    }
    async getGooglePublicKeys() {
        const response = await axios_1.default.get('https://www.googleapis.com/oauth2/v3/certs');
        return response.data;
    }
};
exports.CombinedAuthGuard = CombinedAuthGuard;
exports.CombinedAuthGuard = CombinedAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], CombinedAuthGuard);
//# sourceMappingURL=google-jwtauth.guard.js.map