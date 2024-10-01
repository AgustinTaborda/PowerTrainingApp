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
exports.UserRoutineLogController = void 0;
const common_1 = require("@nestjs/common");
const user_routine_log_service_1 = require("./user_routine_log.service");
const create_user_routine_log_dto_1 = require("./dto/create-user_routine_log.dto");
const update_user_routine_log_dto_1 = require("./dto/update-user_routine_log.dto");
const swagger_1 = require("@nestjs/swagger");
const google_jwtauth_guard_1 = require("../guards/google-jwtauth.guard");
let UserRoutineLogController = class UserRoutineLogController {
    constructor(userRoutineLogService) {
        this.userRoutineLogService = userRoutineLogService;
    }
    create(createUserRoutineLogDto) {
        return this.userRoutineLogService.create(createUserRoutineLogDto);
    }
    findAll() {
        return this.userRoutineLogService.findAll();
    }
    findOne(id) {
        return this.userRoutineLogService.findOne(+id);
    }
    update(id, updateUserRoutineLogDto) {
        return this.userRoutineLogService.update(+id, updateUserRoutineLogDto);
    }
    remove(id) {
        return this.userRoutineLogService.remove(+id);
    }
};
exports.UserRoutineLogController = UserRoutineLogController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_routine_log_dto_1.CreateUserRoutineLogDto]),
    __metadata("design:returntype", void 0)
], UserRoutineLogController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserRoutineLogController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserRoutineLogController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_routine_log_dto_1.UpdateUserRoutineLogDto]),
    __metadata("design:returntype", void 0)
], UserRoutineLogController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserRoutineLogController.prototype, "remove", null);
exports.UserRoutineLogController = UserRoutineLogController = __decorate([
    (0, swagger_1.ApiTags)('user-routine-log'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(google_jwtauth_guard_1.CombinedAuthGuard),
    (0, common_1.Controller)('user-routine-log'),
    __metadata("design:paramtypes", [user_routine_log_service_1.UserRoutineLogService])
], UserRoutineLogController);
//# sourceMappingURL=user_routine_log.controller.js.map