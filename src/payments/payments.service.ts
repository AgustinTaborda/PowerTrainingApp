import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { SubscriptionEntity } from '../subscriptions/entities/subscription.entity';
import { SubscriptionPlan } from '../subscriptions/entities/subscriptionPlan.entity';
import { MailService } from '../mailer/mailer.service';
import { PaymentEntity } from './entities/payment.entity';
import * as fs from 'fs';
import * as path from 'path';

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
    const subscription = new SubscriptionEntity();

    const body = {
      items: items,
      external_reference: subscription.id,
      back_urls: {
        success: `${process.env.FRONTEND_URL}/notification/success`,
        failure: `${process.env.FRONTEND_URL}/pricing/`,
        rejected: `${process.env.FRONTEND_URL}/notification/rejected`,
        pending: `${process.env.FRONTEND_URL}/notification/pending`,
        // cancel: `${process.env.FRONTEND_URL}/dashboard/notification/cancel`,
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
      subscription.paymentStatus = 'pending'; // Cambia según el estado del pago
      subscription.subscriptionStartDate = startDate;
      subscription.subscriptionEndDate = endDate;

      await this.subscriptionRepository.save(subscription);

      // Actualizar al usuario como suscrito
      user.isSubscribed = true;
      user.subscriptionEndDate = endDate;

      await this.userRepository.save(user);

      // NOTA: Ya no se envía el correo en este punto.
      // El correo se enviará cuando se reciba la notificación de Mercado Pago.

      return result; // Devuelve la preferencia de pago a la aplicación frontend
    } catch (error) {
      throw new Error(
        'Error al crear el pago con Mercado Pago: ' + error.message,
      );
    }
  }

  // Función para enviar el correo basado en el estado del pago
  async sendEmailBasedOnStatus(
    user: UserEntity,
    subscriptionPlan: SubscriptionPlan,
    startDate: Date,
    endDate: Date,
    status: string,
    paymentId: string, // Agregado
  ) {
    let templatePath: string;
    let subject: string;

    // Definir la plantilla y el asunto basado en el estado del pago
    if (status === 'approved') {
      templatePath = path.resolve(
        __dirname,
        '..',
        'payments',
        'templates',
        'success.html',
      );
      subject = 'Confirmación de Compra - Suscripción Exitosa';
    } else if (status === 'rejected') {
      templatePath = path.resolve(
        __dirname,
        '..',
        'payments',
        'templates',
        'failure.html',
      );
      subject = 'Error en la Compra - Intenta Nuevamente';
    } else {
      templatePath = path.resolve(
        __dirname,
        '..',
        'payments',
        'templates',
        'pending.html',
      );
      subject = 'Pago Pendiente - En Proceso';
    }

    // Cargar la plantilla HTML
    let emailContent = fs.readFileSync(templatePath, 'utf8');

    if (!(startDate instanceof Date)) {
      startDate = new Date(startDate); // Intenta convertir a Date
    }
    if (!(endDate instanceof Date)) {
      endDate = new Date(endDate); // Intenta convertir a Date
    }

    // Reemplazar variables en la plantilla HTML
    emailContent = emailContent
      .replace('{{name}}', user.name)
      .replace('{{planName}}', subscriptionPlan.name)
      .replace('{{duration}}', subscriptionPlan.durationInMonths.toString())
      .replace('{{price}}', subscriptionPlan.price.toString())
      .replace('{{startDate}}', startDate.toDateString())
      .replace('{{endDate}}', endDate.toDateString())
      .replace('{{paymentId}}', paymentId); // Agregado aquí

    // Enviar correo con contenido HTML
    await this.mailService.sendEmail(user.email, subject, emailContent);
  }

  async processPaymentNotification(paymentId: string) {
    try {
      const payment = await new Payment(this.mercadoPagoClient).get({
        id: paymentId,
      });
      const paymentStatus = payment.status;
      const externalReference = payment.external_reference;

      // Busca la suscripción asociada al ID externo (external_reference)
      const subscription = await this.subscriptionRepository.findOne({
        where: { id: externalReference },
        relations: ['user'],
      });

      if (!subscription) {
        throw new Error('Suscripción no encontrada');
      }

      // Actualizar el estado de la suscripción según el estado del pago
      if (paymentStatus === 'approved') {
        subscription.paymentStatus = 'approved';
        subscription.user.isSubscribed = true;
      } else if (paymentStatus === 'pending') {
        subscription.paymentStatus = 'pending';
      } else if (paymentStatus === 'rejected') {
        subscription.paymentStatus = 'rejected';
        subscription.user.isSubscribed = false;
      } else if (paymentStatus === 'null') {
        subscription.paymentStatus = 'null';
        subscription.user.isSubscribed = false;
      }

      // Almacena el paymentId en la suscripción
      subscription.paymentId = paymentId; // Agregar esta línea para guardar el paymentId

      await this.subscriptionRepository.save(subscription);
      await this.userRepository.save(subscription.user);

      // Enviar correo al usuario basado en el estado del pago
      await this.sendEmailBasedOnStatus(
        subscription.user,
        subscription.subscriptionPlan,
        subscription.subscriptionStartDate,
        subscription.subscriptionEndDate,
        paymentStatus,
        paymentId, // Agregado aquí
      );
    } catch (error) {
      console.error('Error al procesar la notificación de pago:', error);
      throw new Error('Error al procesar la notificación de pago');
    }
  }
}
