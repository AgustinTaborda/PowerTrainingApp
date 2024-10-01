import { SubscriptionPlan } from './subscriptionPlan.entity';
import { UserEntity } from 'src/users/entities/user.entity';
export declare class SubscriptionEntity {
    id: string;
    user: UserEntity;
    subscriptionPlan: SubscriptionPlan;
    paymentStatus: string;
    subscriptionStartDate: Date;
    subscriptionEndDate: Date;
}
