import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { SubscriptionEntity } from '../subscriptions/entities/subscription.entity';
import { SubscriptionPlan } from '../subscriptions/entities/subscriptionPlan.entity';
import { MailService } from '../mailer/mailer.service';
export declare class PaymentService {
    private userRepository;
    private subscriptionRepository;
    private subscriptionPlanRepository;
    mailService: MailService;
    private mercadoPagoClient;
    constructor(userRepository: Repository<UserEntity>, subscriptionRepository: Repository<SubscriptionEntity>, subscriptionPlanRepository: Repository<SubscriptionPlan>, mailService: MailService);
    createPayment(userId: string, planId: string, cartItems: any[]): Promise<import("mercadopago/dist/clients/preference/commonTypes").PreferenceResponse>;
}
