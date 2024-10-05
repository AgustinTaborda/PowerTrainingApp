import { Role } from 'src/auth/roles.enum';
import { RoutineEntity } from 'src/routine/entities/routine.entity';
import { SubscriptionEntity } from 'src/subscriptions/entities/subscription.entity';
export declare class UserEntity {
    id: string;
    googleId: string;
    providerId: string;
    provider: string;
    name: string;
    lastName: string;
    birthDay: Date;
    role: Role;
    email: string;
    password: string;
    isSubscribed: boolean;
    subscriptionEndDate: Date;
    picture: string;
    subscriptions: SubscriptionEntity[];
    routines: RoutineEntity[];
}
