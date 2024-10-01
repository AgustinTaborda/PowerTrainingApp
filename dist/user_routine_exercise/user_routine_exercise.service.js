"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutineExerciseService = void 0;
const common_1 = require("@nestjs/common");
let UserRoutineExerciseService = class UserRoutineExerciseService {
    create(createUserRoutineExerciseDto) {
        return 'This action adds a new userRoutineExercise';
    }
    findAll() {
        return `This action returns all userRoutineExercise`;
    }
    findOne(id) {
        return `This action returns a #${id} userRoutineExercise`;
    }
    update(id, updateUserRoutineExerciseDto) {
        return `This action updates a #${id} userRoutineExercise`;
    }
    remove(id) {
        return `This action removes a #${id} userRoutineExercise`;
    }
};
exports.UserRoutineExerciseService = UserRoutineExerciseService;
exports.UserRoutineExerciseService = UserRoutineExerciseService = __decorate([
    (0, common_1.Injectable)()
], UserRoutineExerciseService);
//# sourceMappingURL=user_routine_exercise.service.js.map