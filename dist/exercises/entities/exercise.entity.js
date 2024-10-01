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
exports.ExerciseEntity = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const status_enum_1 = require("../types/status.enum");
let ExerciseEntity = class ExerciseEntity {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
};
exports.ExerciseEntity = ExerciseEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ExerciseEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ExerciseEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ExerciseEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'urlvideoexample', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ExerciseEntity.prototype, "urlVideoExample", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ExerciseEntity.prototype, "benefits", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ExerciseEntity.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum',
        enum: status_enum_1.Status,
        default: status_enum_1.Status.ACTIVE }),
    __metadata("design:type", String)
], ExerciseEntity.prototype, "status", void 0);
exports.ExerciseEntity = ExerciseEntity = __decorate([
    (0, typeorm_1.Entity)('exercises')
], ExerciseEntity);
//# sourceMappingURL=exercise.entity.js.map