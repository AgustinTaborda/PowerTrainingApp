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
exports.ExercisesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exercise_entity_1 = require("./entities/exercise.entity");
const Repository_1 = require("typeorm/repository/Repository");
let ExercisesService = class ExercisesService {
    async changeStatus(id, status) {
        try {
            let exercise = await this.exercisesRepository.findOne({ where: { id } });
            if (!exercise) {
                throw new common_1.NotFoundException(`Exercise with ID ${id} not found`);
            }
            const result = await this.exercisesRepository.update(id, { status });
            if (result.affected === 0) {
                throw new common_1.HttpException(`Failed to update exercise with ID ${id}`, common_1.HttpStatus.BAD_REQUEST);
            }
            exercise = await this.exercisesRepository.findOneBy({ id });
            return {
                id: exercise.id,
                status: exercise.status,
                description: exercise.description,
            };
        }
        catch (error) {
            throw new common_1.HttpException('An error occurred while updating the exercise: ' + error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    constructor(exercisesRepository) {
        this.exercisesRepository = exercisesRepository;
    }
    async create(createExerciseDto) {
        const exercise = this.exercisesRepository.create(createExerciseDto);
        return await this.exercisesRepository.save(exercise);
    }
    async findAllByFilters(filters, page = 1, limit = 10) {
        try {
            const qb = this.exercisesRepository.createQueryBuilder('exercises');
            if (filters.name) {
                qb.andWhere('LOWER(exercises.name) LIKE LOWER(:name)', { name: `%${filters.name}%` });
            }
            if (filters.benefits) {
                qb.andWhere('LOWER(exercises.benefits) LIKE LOWER(:benefits)', { benefits: `%${filters.benefits}%` });
            }
            if (filters.tags) {
                qb.andWhere('LOWER(exercises.tags) LIKE LOWER(:tags)', { tags: `%${filters.tags}%` });
            }
            if (filters.status) {
                qb.andWhere('exercises.status = :status', { status: filters.status });
            }
            const offset = (page - 1) * limit;
            qb.skip(offset).take(limit);
            const [data, count] = await qb.getManyAndCount();
            return { data, count };
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findOne(id) {
        const exercise = await this.exercisesRepository.findOne({ where: { id } });
        if (!exercise) {
            throw new common_1.NotFoundException(`Exercise with ID ${id} not found`);
        }
        return exercise;
    }
    async update(id, updateExerciseDto) {
        try {
            const exercise = await this.exercisesRepository.findOne({ where: { id } });
            if (!exercise) {
                throw new common_1.NotFoundException(`Exercise with ID ${id} not found`);
            }
            const updatedExercise = this.exercisesRepository.merge(exercise, updateExerciseDto);
            return await this.exercisesRepository.save(updatedExercise);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.HttpException('An error occurred while updating the exercise: ' + error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async remove(id) {
        const exercise = await this.exercisesRepository.findOne({ where: { id } });
        if (!exercise) {
            throw new common_1.NotFoundException(`Exercise with ID ${id} not found`);
        }
        return await this.exercisesRepository.delete(id);
    }
};
exports.ExercisesService = ExercisesService;
exports.ExercisesService = ExercisesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exercise_entity_1.ExerciseEntity)),
    __metadata("design:paramtypes", [Repository_1.Repository])
], ExercisesService);
//# sourceMappingURL=exercises.service.js.map