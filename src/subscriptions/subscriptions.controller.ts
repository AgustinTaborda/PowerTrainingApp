import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { SubscriptionService } from './subscriptions.service';
import { SubscriptionEntity } from './entities/subscription.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('SUBSCRIPTIONS')
@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  async createSubscription(
    @Body('userId') userId: string,
    @Body('planId') planId: string,
  ): Promise<SubscriptionEntity> {
    return await this.subscriptionService.createSubscription(userId, planId);
  }

  @Get('user/:userId')
  async getSubscriptionsForUser(
    @Param('userId') userId: string,
  ): Promise<SubscriptionEntity[]> {
    return await this.subscriptionService.getSubscriptionsForUser(userId);
  }

  // @Get('user/:id')
  // async getSubscriptionsForUser(
  //   @Param('id') id: string,
  // ): Promise<SubscriptionEntity[]> {
  //   return await this.subscriptionService.getSubscriptionsForUser(id);
  // }

  @Get()
  async getAllSubscriptions(): Promise<SubscriptionEntity[]> {
    return await this.subscriptionService.getAllSubscriptions();
  }

  @Delete(':id')
  async deleteSubscription(@Param('id') id: string): Promise<void> {
    await this.subscriptionService.delete(id);
  }
}
