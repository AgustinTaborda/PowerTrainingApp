"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutineLogService = void 0;
const common_1 = require("@nestjs/common");
let UserRoutineLogService = class UserRoutineLogService {
    create(createUserRoutineLogDto) {
        return 'This action adds a new userRoutineLog';
    }
    findAll() {
        return `This action returns all userRoutineLog`;
    }
    findOne(id) {
        return `This action returns a #${id} userRoutineLog`;
    }
    update(id, updateUserRoutineLogDto) {
        return `This action updates a #${id} userRoutineLog`;
    }
    remove(id) {
        return `This action removes a #${id} userRoutineLog`;
    }
};
exports.UserRoutineLogService = UserRoutineLogService;
exports.UserRoutineLogService = UserRoutineLogService = __decorate([
    (0, common_1.Injectable)()
], UserRoutineLogService);
//# sourceMappingURL=user_routine_log.service.js.map