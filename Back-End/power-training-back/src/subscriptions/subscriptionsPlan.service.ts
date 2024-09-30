import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionPlan } from './entities/subscriptionPlan.entity';

@Injectable()
export class SubscriptionPlanService {
  constructor(
    @InjectRepository(SubscriptionPlan)
    private readonly subscriptionPlanRepository: Repository<SubscriptionPlan>,
  ) {}

  async createPlan(
    planData: Partial<SubscriptionPlan>,
  ): Promise<SubscriptionPlan> {
    const newPlan = this.subscriptionPlanRepository.create(planData);
    return await this.subscriptionPlanRepository.save(newPlan);
  }

  async getAllPlans(): Promise<SubscriptionPlan[]> {
    return await this.subscriptionPlanRepository.find();
  }

  async getPlanById(id: string): Promise<SubscriptionPlan> {
    return await this.subscriptionPlanRepository.findOne({ where: { id } });
  }

  async updatePlan(
    id: string,
    updateData: Partial<SubscriptionPlan>,
  ): Promise<SubscriptionPlan> {
    await this.subscriptionPlanRepository.update(id, updateData);
    return this.getPlanById(id);
  }

  async deletePlan(id: string): Promise<void> {
    await this.subscriptionPlanRepository.delete(id);
  }
}
