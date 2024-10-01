import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { SubscriptionEntity } from '../subscriptions/entities/subscription.entity';
import { SubscriptionPlan } from '../subscriptions/entities/subscriptionPlan.entity';
import { MailService } from '../mailer/mailer.service';
@Injectable()
export class PaymentService {
  private mercadoPagoClient: MercadoPagoConfig;

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepository: Repository<SubscriptionEntity>,
    @InjectRepository(SubscriptionPlan)
    private subscriptionPlanRepository: Repository<SubscriptionPlan>,
    public mailService: MailService
   
  ) {
    this.mercadoPagoClient = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    });
  }

  async createPayment(userId: string, planId: string, cartItems: any[]) {
    // Obtener el plan de suscripción seleccionado
    const subscriptionPlan = await this.subscriptionPlanRepository.findOne({
      where: { id: planId },
    });

    if (!subscriptionPlan) {
      throw new Error('Plan de suscripción no encontrado');
    }

    // Crear la preferencia de pago con los items del carrito y las URLs de retorno dinámicas
    const items = cartItems.map((item) => ({
      id: item.id,
      title: item.name,
      unit_price: item.price,
      quantity: item.quantity,
      currency_id: 'ARS',
    }));

    const preference = new Preference(this.mercadoPagoClient);
    const body = {
      items: items,
      back_urls: {
        success: `${process.env.FRONTEND_URL}/dashboard/order/success`,
        failure: `${process.env.FRONTEND_URL}/dashboard/order/failure`,
        pending: `${process.env.FRONTEND_URL}/dashboard/order/pending`,
      },
      auto_return: 'approved',
    };

    try {
      const result = await preference.create({ body });

      // Obtener el usuario para el que se está creando la suscripción
      const user = await this.userRepository.findOne({ where: { id: userId } });
      
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // Calcular las fechas de inicio y fin de la suscripción
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(
        startDate.getMonth() + subscriptionPlan.durationInMonths,
      );

      // Crear la suscripción y guardarla en la base de datos
      const subscription = new SubscriptionEntity();
      subscription.user = user;
      subscription.subscriptionPlan = subscriptionPlan;
      subscription.paymentStatus = 'approved'; // Actualizar a 'paid' después de confirmar el pago
      subscription.subscriptionStartDate = startDate;
      subscription.subscriptionEndDate = endDate;

      await this.subscriptionRepository.save(subscription);

      // Marcar al usuario como suscrito y actualizar la fecha de fin de suscripción
      user.isSubscribed = true;
      user.subscriptionEndDate = endDate;

      await this.userRepository.save(user);

<<<<<<< HEAD
      if (user.email){
=======
>>>>>>> 3a829ac768dcf61e2464d0c9708f028ae59dd5ee
      this.mailService.sendEmail(user.email,
        'Mensajes POWERTRAINING',
        'Le informamos que su pago ha sido aprobado con éxito. Muchas gracias.',
      )
<<<<<<< HEAD
    }

=======
>>>>>>> 3a829ac768dcf61e2464d0c9708f028ae59dd5ee
      return result;
    } catch (error) {
     
      throw new Error('Error al crear el pago con Mercado Pago');
    }
  }
}
