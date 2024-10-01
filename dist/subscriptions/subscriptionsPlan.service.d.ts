import { Repository } from 'typeorm';
import { SubscriptionPlan } from './entities/subscriptionPlan.entity';
export declare class SubscriptionPlanService {
    private readonly subscriptionPlanRepository;
    constructor(subscriptionPlanRepository: Repository<SubscriptionPlan>);
    createPlan(planData: Partial<SubscriptionPlan>): Promise<SubscriptionPlan>;
    getAllPlans(): Promise<SubscriptionPlan[]>;
    getPlanById(id: string): Promise<SubscriptionPlan>;
    updatePlan(id: string, updateData: Partial<SubscriptionPlan>): Promise<SubscriptionPlan>;
    deletePlan(id: string): Promise<void>;
}
