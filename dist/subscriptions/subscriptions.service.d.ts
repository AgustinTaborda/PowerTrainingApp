import { Repository } from 'typeorm';
import { SubscriptionEntity } from './entities/subscription.entity';
import { UserEntity } from '../users/entities/user.entity';
import { SubscriptionPlan } from './entities/subscriptionPlan.entity';
export declare class SubscriptionService {
    private readonly subscriptionRepository;
    private readonly userRepository;
    private readonly subscriptionPlanRepository;
    constructor(subscriptionRepository: Repository<SubscriptionEntity>, userRepository: Repository<UserEntity>, subscriptionPlanRepository: Repository<SubscriptionPlan>);
    createSubscription(userId: string, planId: string): Promise<SubscriptionEntity>;
    getAllSubscriptions(): Promise<SubscriptionEntity[]>;
    getSubscriptionsForUser(userId: string): Promise<SubscriptionEntity[]>;
}
