import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { MercadoPagoConfig, Preference } from 'mercadopago';

@Injectable()
export class PaymentsService {
  async create(createPaymentDto: CreatePaymentDto) {
    const client = new MercadoPagoConfig({ accessToken: process.env.YOUR_ACCESS_TOKEN });

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
        "success": "https://3d3a-210-23-154-34.ngrok-free.app/api",
        "failure": "https://3d3a-210-23-154-34.ngrok-free.app/api",
        "pending": "https://3d3a-210-23-154-34.ngrok-free.app/api"
      },
      auto_return: "approved",
	  };

    const result = await preference.create( { body } )

// 	Preference.create(preference)
// 		.then(function (response) {
// 			res.json({
// 				id: response.body.id
// 			});
// 		}).catch(function (error) {
// 			console.log(error);
// 		});
// });
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
