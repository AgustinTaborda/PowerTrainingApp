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
exports.UserRoutineExercise = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
let UserRoutineExercise = class UserRoutineExercise {
    constructor() {
        this.userId = (0, uuid_1.v4)();
        this.exerciseId = (0, uuid_1.v4)();
    }
};
exports.UserRoutineExercise = UserRoutineExercise;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserRoutineExercise.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], UserRoutineExercise.prototype, "exerciseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], UserRoutineExercise.prototype, "repetitions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], UserRoutineExercise.prototype, "wight", void 0);
exports.UserRoutineExercise = UserRoutineExercise = __decorate([
    (0, typeorm_1.Entity)('user_routine_exercise')
], UserRoutineExercise);
//# sourceMappingURL=user_routine_exercise.entity.js.map