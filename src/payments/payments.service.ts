import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { SubscriptionEntity } from '../subscriptions/entities/subscription.entity';
import { SubscriptionPlan } from '../subscriptions/entities/subscriptionPlan.entity';
import { MailService } from '../mailer/mailer.service';
import { PaymentEntity } from './entities/payment.entity';

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
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
    public mailService: MailService,
  ) {
    this.mercadoPagoClient = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    });
  }

  
  async getAllPayments() {
    return await this.paymentRepository.find();
  }

  async createPayment(userId: string, planId: string, cartItems: any[]) {
    // Obtener el plan de suscripción seleccionado
    const subscriptionPlan = await this.subscriptionPlanRepository.findOne({
      where: { id: planId },
    });

    if (!subscriptionPlan) {
      throw new Error('Plan de suscripción no encontrado');
    }

    // Crear la preferencia de pago con los items del carrito
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

      // Obtener el usuario
      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // Calcular fechas de suscripción
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(
        startDate.getMonth() + subscriptionPlan.durationInMonths,
      );

      // Crear la suscripción
      const subscription = new SubscriptionEntity();
      subscription.user = user;
      subscription.subscriptionPlan = subscriptionPlan;
      subscription.paymentStatus = 'approved'; // Se actualiza después de confirmar el pago
      subscription.subscriptionStartDate = startDate;
      subscription.subscriptionEndDate = endDate;

      await this.subscriptionRepository.save(subscription);

      // Actualizar al usuario como suscrito
      user.isSubscribed = true;
      user.subscriptionEndDate = endDate;

      await this.userRepository.save(user);

      // Enviar correo con los detalles de la compra
      const emailContent = `
        Hola ${user.name},

        Gracias por tu compra. A continuación te dejamos los detalles de tu suscripción:

        - Plan: ${subscriptionPlan.name}
        - Duración: ${subscriptionPlan.durationInMonths} meses
        - Precio total: ${subscriptionPlan.price}

        Fecha de inicio de la suscripción: ${startDate.toDateString()}
        Fecha de finalización de la suscripción: ${endDate.toDateString()}

        ¡Gracias por confiar en nosotros!
      `;

      await this.mailService.sendEmail(
        user.email,
        'Confirmación de Compra - Suscripción',
        emailContent,
      );

      return result; // Devuelve la preferencia de pago a la aplicación frontend
    } catch (error) {
      throw new Error(
        'Error al crear el pago con Mercado Pago: ' + error.message,
      );
    }
  }
}
