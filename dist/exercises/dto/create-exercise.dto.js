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
exports.CreateExerciseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const status_enum_1 = require("../types/status.enum");
class CreateExerciseDto {
}
exports.CreateExerciseDto = CreateExerciseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del ejercicio.',
        example: 'Tricep con Polea'
    }),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descripcion del ejercicio.',
        example: 'Inclínate ligeramente hacia delante, exhala y empuja la barra hacia abajo utilizando solo los tríceps hasta que la barra llegue a la altura de la cadera y la parte superior del muslo.'
    }),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL del video demostrativo.',
        example: 'https://www.youtube.com/watch?v=1YSqh2saQi0'
    }),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "urlVideoExample", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Beneficios del ejercicio',
        example: 'Trabaja triceps'
    }),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "benefits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Palabras clave que identifiquen el ejercicio',
        example: 'Triceps Polea'
    }),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Es el status del ejercicio, acepta 3 estados: active, trash, inactive',
        example: 'active'
    }),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "status", void 0);
//# sourceMappingURL=create-exercise.dto.js.map