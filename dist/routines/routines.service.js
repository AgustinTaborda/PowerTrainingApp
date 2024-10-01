"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutinesService = void 0;
const common_1 = require("@nestjs/common");
let RoutinesService = class RoutinesService {
    create(createRoutineDto) {
        return 'This action adds a new routine';
    }
    findAll() {
        return `This action returns all routines`;
    }
    findOne(id) {
        return `This action returns a #${id} routine`;
    }
    update(id, updateRoutineDto) {
        return `This action updates a #${id} routine`;
    }
    remove(id) {
        return `This action removes a #${id} routine`;
    }
};
exports.RoutinesService = RoutinesService;
exports.RoutinesService = RoutinesService = __decorate([
    (0, common_1.Injectable)()
], RoutinesService);
//# sourceMappingURL=routines.service.js.map