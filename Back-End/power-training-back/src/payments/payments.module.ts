import { Module } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentEntity } from './entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { SubscriptionEntity } from '../subscriptions/entities/subscription.entity';
import { SubscriptionPlan } from '../subscriptions/entities/subscriptionPlan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentEntity,
      UserEntity,
      SubscriptionEntity,
      SubscriptionPlan,
    ]), // Incluir todas las entidades necesarias
  ],
  controllers: [PaymentsController],
  providers: [PaymentService],
})
export class PaymentsModule {}
