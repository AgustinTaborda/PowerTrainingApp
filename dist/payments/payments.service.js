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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const mercadopago_1 = require("mercadopago");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const subscription_entity_1 = require("../subscriptions/entities/subscription.entity");
const subscriptionPlan_entity_1 = require("../subscriptions/entities/subscriptionPlan.entity");
const mailer_service_1 = require("../mailer/mailer.service");
let PaymentService = class PaymentService {
    constructor(userRepository, subscriptionRepository, subscriptionPlanRepository, mailService) {
        this.userRepository = userRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.subscriptionPlanRepository = subscriptionPlanRepository;
        this.mailService = mailService;
        this.mercadoPagoClient = new mercadopago_1.MercadoPagoConfig({
            accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
        });
    }
    async createPayment(userId, planId, cartItems) {
        const subscriptionPlan = await this.subscriptionPlanRepository.findOne({
            where: { id: planId },
        });
        if (!subscriptionPlan) {
            throw new Error('Plan de suscripción no encontrado');
        }
        const items = cartItems.map((item) => ({
            id: item.id,
            title: item.name,
            unit_price: item.price,
            quantity: item.quantity,
            currency_id: 'ARS',
        }));
        const preference = new mercadopago_1.Preference(this.mercadoPagoClient);
        const body = {
            items: items,
            back_urls: {
                success: `${process.env.FRONTEND_URL}/dashboard/order/success`,
                failure: `${process.env.FRONTEND_URL}/dashboard/order/failure`,
                pending: `${process.env.FRONTEND_URL}/dashboard/order/pending`,
            },
            auto_return: 'approved',
        };
        try {
            const result = await preference.create({ body });
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            const startDate = new Date();
            const endDate = new Date();
            endDate.setMonth(startDate.getMonth() + subscriptionPlan.durationInMonths);
            const subscription = new subscription_entity_1.SubscriptionEntity();
            subscription.user = user;
            subscription.subscriptionPlan = subscriptionPlan;
            subscription.paymentStatus = 'approved';
            subscription.subscriptionStartDate = startDate;
            subscription.subscriptionEndDate = endDate;
            await this.subscriptionRepository.save(subscription);
            user.isSubscribed = true;
            user.subscriptionEndDate = endDate;
            await this.userRepository.save(user);
            if (user.email) {
                this.mailService.sendEmail(user.email, 'Mensajes POWERTRAINING', 'Le informamos que su pago ha sido aprobado con éxito. Muchas gracias.');
            }
            return result;
        }
        catch (error) {
            throw new Error('Error al crear el pago con Mercado Pago: ' + error.message);
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(subscription_entity_1.SubscriptionEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(subscriptionPlan_entity_1.SubscriptionPlan)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mailer_service_1.MailService])
], PaymentService);
//# sourceMappingURL=payments.service.js.map