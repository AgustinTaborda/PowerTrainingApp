import { SubscriptionService } from './subscriptions.service';
import { SubscriptionEntity } from './entities/subscription.entity';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    createSubscription(userId: string, planId: string): Promise<SubscriptionEntity>;
    getSubscriptionsForUser(userId: string): Promise<SubscriptionEntity[]>;
    getAllSubscriptions(): Promise<SubscriptionEntity[]>;
}
