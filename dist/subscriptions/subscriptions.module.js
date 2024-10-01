"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const subscription_entity_1 = require("./entities/subscription.entity");
const subscriptionPlan_entity_1 = require("./entities/subscriptionPlan.entity");
const subscriptions_service_1 = require("./subscriptions.service");
const subscriptions_controller_1 = require("./subscriptions.controller");
const subscriptionsPlan_service_1 = require("./subscriptionsPlan.service");
const subscriptionsPlan_controller_1 = require("./subscriptionsPlan.controller");
const user_entity_1 = require("../users/entities/user.entity");
let SubscriptionsModule = class SubscriptionsModule {
};
exports.SubscriptionsModule = SubscriptionsModule;
exports.SubscriptionsModule = SubscriptionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                subscription_entity_1.SubscriptionEntity,
                subscriptionPlan_entity_1.SubscriptionPlan,
                user_entity_1.UserEntity,
            ]),
        ],
        controllers: [subscriptions_controller_1.SubscriptionController, subscriptionsPlan_controller_1.SubscriptionPlanController],
        providers: [subscriptions_service_1.SubscriptionService, subscriptionsPlan_service_1.SubscriptionPlanService],
    })
], SubscriptionsModule);
//# sourceMappingURL=subscriptions.module.js.map