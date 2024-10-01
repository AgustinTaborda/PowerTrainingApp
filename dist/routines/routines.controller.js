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
exports.RoutinesController = void 0;
const common_1 = require("@nestjs/common");
const routines_service_1 = require("./routines.service");
const create_routine_dto_1 = require("./dto/create-routine.dto");
const update_routine_dto_1 = require("./dto/update-routine.dto");
const swagger_1 = require("@nestjs/swagger");
const google_jwtauth_guard_1 = require("../guards/google-jwtauth.guard");
let RoutinesController = class RoutinesController {
    constructor(routinesService) {
        this.routinesService = routinesService;
    }
    create(createRoutineDto) {
        return this.routinesService.create(createRoutineDto);
    }
    findAll() {
        return this.routinesService.findAll();
    }
    findOne(id) {
        return this.routinesService.findOne(+id);
    }
    update(id, updateRoutineDto) {
        return this.routinesService.update(+id, updateRoutineDto);
    }
    remove(id) {
        return this.routinesService.remove(+id);
    }
};
exports.RoutinesController = RoutinesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_routine_dto_1.CreateRoutineDto]),
    __metadata("design:returntype", void 0)
], RoutinesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoutinesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoutinesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_routine_dto_1.UpdateRoutineDto]),
    __metadata("design:returntype", void 0)
], RoutinesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoutinesController.prototype, "remove", null);
exports.RoutinesController = RoutinesController = __decorate([
    (0, swagger_1.ApiTags)('routines'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(google_jwtauth_guard_1.CombinedAuthGuard),
    (0, common_1.Controller)('routines'),
    __metadata("design:paramtypes", [routines_service_1.RoutinesService])
], RoutinesController);
//# sourceMappingURL=routines.controller.js.map