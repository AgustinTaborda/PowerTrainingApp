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
exports.SubscriptionPlanController = void 0;
const common_1 = require("@nestjs/common");
const subscriptionsPlan_service_1 = require("./subscriptionsPlan.service");
const swagger_1 = require("@nestjs/swagger");
let SubscriptionPlanController = class SubscriptionPlanController {
    constructor(subscriptionPlanService) {
        this.subscriptionPlanService = subscriptionPlanService;
    }
    async createPlan(planData) {
        return await this.subscriptionPlanService.createPlan(planData);
    }
    async getAllPlans() {
        return await this.subscriptionPlanService.getAllPlans();
    }
    async getPlanById(id) {
        return await this.subscriptionPlanService.getPlanById(id);
    }
    async updatePlan(id, updateData) {
        return await this.subscriptionPlanService.updatePlan(id, updateData);
    }
    async deletePlan(id) {
        await this.subscriptionPlanService.deletePlan(id);
    }
};
exports.SubscriptionPlanController = SubscriptionPlanController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionPlanController.prototype, "createPlan", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubscriptionPlanController.prototype, "getAllPlans", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscriptionPlanController.prototype, "getPlanById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionPlanController.prototype, "updatePlan", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscriptionPlanController.prototype, "deletePlan", null);
exports.SubscriptionPlanController = SubscriptionPlanController = __decorate([
    (0, swagger_1.ApiTags)('subscription-plans'),
    (0, common_1.Controller)('subscription-plans'),
    __metadata("design:paramtypes", [subscriptionsPlan_service_1.SubscriptionPlanService])
], SubscriptionPlanController);
//# sourceMappingURL=subscriptionsPlan.controller.js.map