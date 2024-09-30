import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from './entities/subscription.entity';
import { SubscriptionPlan } from './entities/subscriptionPlan.entity';
import { SubscriptionService } from './subscriptions.service';
import { SubscriptionController } from './subscriptions.controller';
import { SubscriptionPlanService } from './subscriptionsPlan.service';
import { SubscriptionPlanController } from './subscriptionsPlan.controller';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubscriptionEntity,
      SubscriptionPlan,
      UserEntity,
    ]),
  ],
  controllers: [SubscriptionController, SubscriptionPlanController],
  providers: [SubscriptionService, SubscriptionPlanService],
})
export class SubscriptionsModule {}
