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
exports.UserRoutineExerciseEntity = void 0;
const typeorm_1 = require("typeorm");
const training_day_entity_1 = require("../../training_day/entities/training_day.entity");
const exercise_entity_1 = require("../../exercises/entities/exercise.entity");
const user_progress_entity_1 = require("../../user-progress/entities/user-progress.entity");
let UserRoutineExerciseEntity = class UserRoutineExerciseEntity {
};
exports.UserRoutineExerciseEntity = UserRoutineExerciseEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], UserRoutineExerciseEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => training_day_entity_1.TrainingDayEntity, (trainingDay) => trainingDay.exercises, { nullable: false }),
    __metadata("design:type", training_day_entity_1.TrainingDayEntity)
], UserRoutineExerciseEntity.prototype, "trainingDay", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exercise_entity_1.ExerciseEntity, { nullable: false }),
    __metadata("design:type", exercise_entity_1.ExerciseEntity)
], UserRoutineExerciseEntity.prototype, "exercise", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], UserRoutineExerciseEntity.prototype, "series", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], UserRoutineExerciseEntity.prototype, "repetitions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], UserRoutineExerciseEntity.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], UserRoutineExerciseEntity.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_progress_entity_1.UserProgressEntity, (log) => log.userRoutineExercise),
    __metadata("design:type", Array)
], UserRoutineExerciseEntity.prototype, "logs", void 0);
exports.UserRoutineExerciseEntity = UserRoutineExerciseEntity = __decorate([
    (0, typeorm_1.Entity)('user_routine_exercises')
], UserRoutineExerciseEntity);
//# sourceMappingURL=user_routine_exercise.entity.js.map