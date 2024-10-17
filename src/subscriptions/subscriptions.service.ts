import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from './entities/subscription.entity';
import { UserEntity } from '../users/entities/user.entity';
import { SubscriptionPlan } from './entities/subscriptionPlan.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SubscriptionPlan)
    private readonly subscriptionPlanRepository: Repository<SubscriptionPlan>,
  ) {}

  async createSubscription(
    userId: string,
    planId: string,
  ): Promise<SubscriptionEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const plan = await this.subscriptionPlanRepository.findOne({
      where: { id: planId },
    });

    if (!user || !plan) {
      throw new Error('Usuario o plan de suscripción no encontrado');
    }

    const subscription = this.subscriptionRepository.create({
      user,
      subscriptionPlan: plan,
      paymentStatus: 'pending',
      subscriptionStartDate: new Date(),
      subscriptionEndDate: new Date(
        new Date().setMonth(new Date().getMonth() + plan.durationInMonths),
      ),
    });

    return await this.subscriptionRepository.save(subscription);
  }

  async getAllSubscriptions(): Promise<SubscriptionEntity[]> {
    return await this.subscriptionRepository.find();
  }

  async getSubscriptionsForUser(userId: string): Promise<SubscriptionEntity[]> {
    return await this.subscriptionRepository.find({
      where: { user: { id: userId } },
      relations: ['subscriptionPlan'],
    });
  }

  async delete(id: string): Promise<void> {
    await this.subscriptionRepository.delete(id);
  }
}
