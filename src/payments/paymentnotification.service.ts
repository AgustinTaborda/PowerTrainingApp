import { Injectable } from '@nestjs/common';
import mercadopago from 'mercadopago';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from '../subscriptions/entities/subscription.entity';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepository: Repository<SubscriptionEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
}
