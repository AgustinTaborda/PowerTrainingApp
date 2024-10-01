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
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const subscription_entity_1 = require("./entities/subscription.entity");
const user_entity_1 = require("../users/entities/user.entity");
const subscriptionPlan_entity_1 = require("./entities/subscriptionPlan.entity");
let SubscriptionService = class SubscriptionService {
    constructor(subscriptionRepository, userRepository, subscriptionPlanRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
        this.subscriptionPlanRepository = subscriptionPlanRepository;
    }
    async createSubscription(userId, planId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const plan = await this.subscriptionPlanRepository.findOne({
            where: { id: planId },
        });
        if (!user || !plan) {
            throw new Error('Usuario o plan de suscripción no encontrado');
        }
        const subscription = this.subscriptionRepository.create({
            user,
            subscriptionPlan: plan,
            paymentStatus: 'pending',
            subscriptionStartDate: new Date(),
            subscriptionEndDate: new Date(new Date().setMonth(new Date().getMonth() + plan.durationInMonths)),
        });
        return await this.subscriptionRepository.save(subscription);
    }
    async getAllSubscriptions() {
        return await this.subscriptionRepository.find();
    }
    async getSubscriptionsForUser(userId) {
        return await this.subscriptionRepository.find({
            where: { user: { id: userId } },
            relations: ['subscriptionPlan'],
        });
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subscription_entity_1.SubscriptionEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(subscriptionPlan_entity_1.SubscriptionPlan)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SubscriptionService);
//# sourceMappingURL=subscriptions.service.js.map