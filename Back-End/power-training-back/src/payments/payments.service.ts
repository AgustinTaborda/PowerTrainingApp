import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { paymentDto } from './dto/payment.dto';
import { PaymentEntity } from './entities/payment.entity';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentsService {
  constructor(@InjectRepository(PaymentEntity) private paymentsRepository: Repository<PaymentEntity>) {}
  async createPayment(paymentDto: paymentDto) {
    try {
    
      this.paymentsRepository.create(paymentDto);  
      return  await this.paymentsRepository.save(paymentDto);
    } catch (error) {
      return error.message;
    }

   
  }
  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_YOUR_ACCESS_TOKEN });

      const preference = new Preference(client);
      
      const body = {
        items: [
          {
            id: '001',
            title: 'Suscripcion mensual',
            unit_price: 1000,
            quantity: 1,
            currency_id: 'ARS'
          }
        ],
        back_urls: {
          // "success": "https://www.youtube.com/watch?v=SLHTzOytM0A&t=302s&ab_channel=Jusdeit",
          "success": "https://3d3a-210-23-154-34.ngrok-free.app/api#/payments/success",
          "failure": "https://www.youtube.com/watch?v=SLHTzOytM0A&t=302s&ab_channel=Jusdeit",
          "pending": "https://www.youtube.com/watch?v=SLHTzOytM0A&t=302s&ab_channel=Jusdeit"
        },
        auto_return: "approved",
      };

      const result = await preference.create({ body })

      return {
        id: result.id,
      }
    } catch (error) {
      console.error('Error al crear la preferencia de pago:', error);
      throw new Error('Error al crear el pago');
    }
  }

  async paymentSuccess(paymentId: string, status: string, merchantOrderId: string) {
    return {
      Payment: paymentId,
      Status: status,
      MerchantOrder: merchantOrderId,
    };
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}

