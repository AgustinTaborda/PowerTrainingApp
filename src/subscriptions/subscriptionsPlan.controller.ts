import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { SubscriptionPlanService } from './subscriptionsPlan.service';
import { SubscriptionPlan } from './entities/subscriptionPlan.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SUBSCIPTION-PLANS')
@Controller('subscription-plans')
export class SubscriptionPlanController {
  constructor(
    private readonly subscriptionPlanService: SubscriptionPlanService,
  ) {}

  @Post()
  async createPlan(
    @Body() planData: Partial<SubscriptionPlan>,
  ): Promise<SubscriptionPlan> {
    return await this.subscriptionPlanService.createPlan(planData);
  }

  @Get()
  async getAllPlans(): Promise<SubscriptionPlan[]> {
    return await this.subscriptionPlanService.getAllPlans();
  }

  @Get(':id')
  async getPlanById(@Param('id') id: string): Promise<SubscriptionPlan> {
    return await this.subscriptionPlanService.getPlanById(id);
  }

  @Put(':id')
  async updatePlan(
    @Param('id') id: string,
    @Body() updateData: Partial<SubscriptionPlan>,
  ): Promise<SubscriptionPlan> {
    return await this.subscriptionPlanService.updatePlan(id, updateData);
  }

  @Delete(':id')
  async deletePlan(@Param('id') id: string): Promise<void> {
    await this.subscriptionPlanService.deletePlan(id);
  }
}
