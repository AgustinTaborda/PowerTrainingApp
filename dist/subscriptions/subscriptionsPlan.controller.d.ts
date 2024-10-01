import { SubscriptionPlanService } from './subscriptionsPlan.service';
import { SubscriptionPlan } from './entities/subscriptionPlan.entity';
export declare class SubscriptionPlanController {
    private readonly subscriptionPlanService;
    constructor(subscriptionPlanService: SubscriptionPlanService);
    createPlan(planData: Partial<SubscriptionPlan>): Promise<SubscriptionPlan>;
    getAllPlans(): Promise<SubscriptionPlan[]>;
    getPlanById(id: string): Promise<SubscriptionPlan>;
    updatePlan(id: string, updateData: Partial<SubscriptionPlan>): Promise<SubscriptionPlan>;
    deletePlan(id: string): Promise<void>;
}
