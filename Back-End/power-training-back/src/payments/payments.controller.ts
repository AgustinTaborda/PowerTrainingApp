import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { paymentDto } from './dto/payment.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/guards/jwtauth.guard';

@ApiTags('payments')
@ApiBearerAuth('access-token')
// @UseGuards(JWTAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Post('/lb')
  @ApiOperation({ summary: 'Create new Payment' })
  pay(@Body() paymentDto: paymentDto) {
    return this.paymentsService.createPayment(paymentDto);
  }

  @Get('success')
  paymentSuccess(
    @Query('payment_id') paymentId: string,
    @Query('status') status: string,
    @Query('merchant_order_id') merchantOrderId: string,
  ) {
    return this.paymentsService.paymentSuccess(
      paymentId,
      status,
      merchantOrderId,
    );
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
