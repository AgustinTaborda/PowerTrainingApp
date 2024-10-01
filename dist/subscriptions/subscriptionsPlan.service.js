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
exports.SubscriptionPlanService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const subscriptionPlan_entity_1 = require("./entities/subscriptionPlan.entity");
let SubscriptionPlanService = class SubscriptionPlanService {
    constructor(subscriptionPlanRepository) {
        this.subscriptionPlanRepository = subscriptionPlanRepository;
    }
    async createPlan(planData) {
        const newPlan = this.subscriptionPlanRepository.create(planData);
        return await this.subscriptionPlanRepository.save(newPlan);
    }
    async getAllPlans() {
        return await this.subscriptionPlanRepository.find();
    }
    async getPlanById(id) {
        return await this.subscriptionPlanRepository.findOne({ where: { id } });
    }
    async updatePlan(id, updateData) {
        await this.subscriptionPlanRepository.update(id, updateData);
        return this.getPlanById(id);
    }
    async deletePlan(id) {
        await this.subscriptionPlanRepository.delete(id);
    }
};
exports.SubscriptionPlanService = SubscriptionPlanService;
exports.SubscriptionPlanService = SubscriptionPlanService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subscriptionPlan_entity_1.SubscriptionPlan)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SubscriptionPlanService);
//# sourceMappingURL=subscriptionsPlan.service.js.map