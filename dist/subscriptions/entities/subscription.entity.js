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
exports.SubscriptionEntity = void 0;
const typeorm_1 = require("typeorm");
const subscriptionPlan_entity_1 = require("./subscriptionPlan.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let SubscriptionEntity = class SubscriptionEntity {
};
exports.SubscriptionEntity = SubscriptionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SubscriptionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.subscriptions),
    __metadata("design:type", user_entity_1.UserEntity)
], SubscriptionEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subscriptionPlan_entity_1.SubscriptionPlan, { eager: true }),
    __metadata("design:type", subscriptionPlan_entity_1.SubscriptionPlan)
], SubscriptionEntity.prototype, "subscriptionPlan", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubscriptionEntity.prototype, "paymentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], SubscriptionEntity.prototype, "subscriptionStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], SubscriptionEntity.prototype, "subscriptionEndDate", void 0);
exports.SubscriptionEntity = SubscriptionEntity = __decorate([
    (0, typeorm_1.Entity)('subscriptions')
], SubscriptionEntity);
//# sourceMappingURL=subscription.entity.js.map