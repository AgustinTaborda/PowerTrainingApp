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
exports.ExercisesController = void 0;
const common_1 = require("@nestjs/common");
const exercises_service_1 = require("./exercises.service");
const create_exercise_dto_1 = require("./dto/create-exercise.dto");
const update_exercise_dto_1 = require("./dto/update-exercise.dto");
const swagger_1 = require("@nestjs/swagger");
const exercises_seed_1 = require("./exercises.seed");
const status_enum_1 = require("./types/status.enum");
const google_jwtauth_guard_1 = require("../guards/google-jwtauth.guard");
let ExercisesController = class ExercisesController {
    constructor(exercisesService, exerciseSeed) {
        this.exercisesService = exercisesService;
        this.exerciseSeed = exerciseSeed;
    }
    seedExercises() {
        return this.exerciseSeed.seedExercises();
    }
    create(createExerciseDto) {
        return this.exercisesService.create(createExerciseDto);
    }
    findAllByFilters(name, benefits, tags, status, page = 1, limit = 10) {
        console.log(status);
        return this.exercisesService.findAllByFilters({ name, benefits, tags, status }, page, limit);
    }
    findOne(id) {
        return this.exercisesService.findOne(id);
    }
    update(id, updateExerciseDto) {
        return this.exercisesService.update(id, updateExerciseDto);
    }
    async makeExerciseInactive(id) {
        return await this.exercisesService.changeStatus(id, status_enum_1.Status.INACTIVE);
    }
    async makeExerciseTrash(id) {
        return await this.exercisesService.changeStatus(id, status_enum_1.Status.TRASH);
    }
    async makeExcersieActive(id) {
        return await this.exercisesService.changeStatus(id, status_enum_1.Status.ACTIVE);
    }
};
exports.ExercisesController = ExercisesController;
__decorate([
    (0, common_1.Post)('/seed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "seedExercises", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exercise_dto_1.CreateExerciseDto]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all excercises' }),
    (0, swagger_1.ApiQuery)({ name: 'name', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'benefits', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'tags', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: status_enum_1.Status, description: 'Filter by status (active, inactive, trash)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 5, description: 'Limite de items por página' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1, description: 'Número de página' }),
    __param(0, (0, common_1.Query)('name')),
    __param(1, (0, common_1.Query)('benefits')),
    __param(2, (0, common_1.Query)('tags')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Query)('page')),
    __param(5, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "findAllByFilters", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'You can update exercises, remember only 3 types of status lowercase active or inactive or trash' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_exercise_dto_1.UpdateExerciseDto]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/inactive'),
    (0, swagger_1.ApiOperation)({ summary: 'Update exercise status to inactive' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "makeExerciseInactive", null);
__decorate([
    (0, common_1.Patch)(':id/trash'),
    (0, swagger_1.ApiOperation)({ summary: 'Update exercise status to trash' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "makeExerciseTrash", null);
__decorate([
    (0, common_1.Patch)(':id/active'),
    (0, swagger_1.ApiOperation)({ summary: 'Update exercise status to active' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "makeExcersieActive", null);
exports.ExercisesController = ExercisesController = __decorate([
    (0, swagger_1.ApiTags)('exercises'),
    (0, common_1.Controller)('exercises'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(google_jwtauth_guard_1.CombinedAuthGuard),
    __metadata("design:paramtypes", [exercises_service_1.ExercisesService,
        exercises_seed_1.ExerciseSeed])
], ExercisesController);
//# sourceMappingURL=exercises.controller.js.map