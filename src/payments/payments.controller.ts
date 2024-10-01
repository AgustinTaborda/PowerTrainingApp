import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    const { userId, planId, cartItems } = createPaymentDto;
    const paymentPreference = await this.paymentService.createPayment(
      userId,
      planId,
      cartItems,
    );
    return paymentPreference;
  }
}
