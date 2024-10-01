"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let GoogleAuthGuard = class GoogleAuthGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromRequest(request);
        if (request.oidc.isAuthenticated()) {
            return true;
        }
        else {
            return false;
        }
    }
    extractTokenFromRequest(request) {
        const authorizationHeader = request.headers['authorization'];
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            return authorizationHeader.split(' ')[1];
        }
        return null;
    }
    async getGooglePublicKeys() {
        const response = await axios_1.default.get('https://www.googleapis.com/oauth2/v3/certs');
        return response.data;
    }
};
exports.GoogleAuthGuard = GoogleAuthGuard;
exports.GoogleAuthGuard = GoogleAuthGuard = __decorate([
    (0, common_1.Injectable)()
], GoogleAuthGuard);
//# sourceMappingURL=google.guard.js.map