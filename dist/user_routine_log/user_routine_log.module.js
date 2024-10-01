"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutineLogModule = void 0;
const common_1 = require("@nestjs/common");
const user_routine_log_service_1 = require("./user_routine_log.service");
const user_routine_log_controller_1 = require("./user_routine_log.controller");
let UserRoutineLogModule = class UserRoutineLogModule {
};
exports.UserRoutineLogModule = UserRoutineLogModule;
exports.UserRoutineLogModule = UserRoutineLogModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_routine_log_controller_1.UserRoutineLogController],
        providers: [user_routine_log_service_1.UserRoutineLogService],
    })
], UserRoutineLogModule);
//# sourceMappingURL=user_routine_log.module.js.map