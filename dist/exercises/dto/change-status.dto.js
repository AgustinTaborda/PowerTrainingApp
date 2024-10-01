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
exports.PartialExerciseDTO = exports.ChangeStatusDto = void 0;
const uuid_1 = require("uuid");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const status_enum_1 = require("../types/status.enum");
const exercise_entity_1 = require("../entities/exercise.entity");
class ChangeStatusDto {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
}
exports.ChangeStatusDto = ChangeStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangeStatusDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangeStatusDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(status_enum_1.Status),
    __metadata("design:type", String)
], ChangeStatusDto.prototype, "status", void 0);
class PartialExerciseDTO extends (0, swagger_1.PartialType)(exercise_entity_1.ExerciseEntity) {
}
exports.PartialExerciseDTO = PartialExerciseDTO;
//# sourceMappingURL=change-status.dto.js.map