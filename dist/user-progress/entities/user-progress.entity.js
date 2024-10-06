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
exports.UserProgressEntity = void 0;
const typeorm_1 = require("typeorm");
const user_routine_exercise_entity_1 = require("../../user_routine_exercise/entities/user_routine_exercise.entity");
let UserProgressEntity = class UserProgressEntity {
};
exports.UserProgressEntity = UserProgressEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], UserProgressEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_routine_exercise_entity_1.UserRoutineExerciseEntity, (exercise) => exercise.logs, { nullable: false }),
    __metadata("design:type", user_routine_exercise_entity_1.UserRoutineExerciseEntity)
], UserProgressEntity.prototype, "userRoutineExercise", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], UserProgressEntity.prototype, "repetitions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], UserProgressEntity.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], UserProgressEntity.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], UserProgressEntity.prototype, "rpe", void 0);
exports.UserProgressEntity = UserProgressEntity = __decorate([
    (0, typeorm_1.Entity)('user_progress')
], UserProgressEntity);
//# sourceMappingURL=user-progress.entity.js.map