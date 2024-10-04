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
var CronTasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronTasksService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const exercise_entity_1 = require("../exercises/entities/exercise.entity");
const status_enum_1 = require("../exercises/types/status.enum");
const typeorm_2 = require("typeorm");
let CronTasksService = CronTasksService_1 = class CronTasksService {
    constructor(exercisesRepository) {
        this.exercisesRepository = exercisesRepository;
        this.logger = new common_1.Logger(CronTasksService_1.name);
    }
    handleCron() {
        this.moveTrashToInactive();
    }
    async moveTrashToInactive() {
        try {
            await this.exercisesRepository
                .createQueryBuilder()
                .update()
                .set({ status: status_enum_1.Status.INACTIVE })
                .where('status = :status', { status: 'trash' })
                .execute();
            console.log('Exercises moved to inactive');
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.CronTasksService = CronTasksService;
CronTasksService.EVERY_3_MINUTES = '*/3 * * * *';
__decorate([
    (0, schedule_1.Cron)(CronTasksService.EVERY_3_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CronTasksService.prototype, "handleCron", null);
exports.CronTasksService = CronTasksService = CronTasksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exercise_entity_1.ExerciseEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CronTasksService);
//# sourceMappingURL=crontask.exercise.service.js.map