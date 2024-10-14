import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { SubscriptionEntity } from '../subscriptions/entities/subscription.entity';
import { SubscriptionPlan } from '../subscriptions/entities/subscriptionPlan.entity';
import { MailService } from '../mailer/mailer.service';
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
    public mailService: MailService,
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
        success: `${process.env.FRONTEND_URL}/notification/success`,
        failure: `${process.env.FRONTEND_URL}/pricing`,
        pending: `${process.env.FRONTEND_URL}/dashboard/notification/pending`,
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

      // Llamada a la función que gestiona el envío de emails
      await this.sendEmailBasedOnStatus(
        user,
        subscriptionPlan,
        startDate,
        endDate,
        'pending',
      ); // Por defecto en estado pending

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
    } else if (status === 'failure') {
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

    // Reemplazar variables en la plantilla HTML
    emailContent = emailContent
      .replace('{{name}}', user.name)
      .replace('{{planName}}', subscriptionPlan.name)
      .replace('{{duration}}', subscriptionPlan.durationInMonths.toString())
      .replace('{{price}}', subscriptionPlan.price.toString())
      .replace('{{startDate}}', startDate.toDateString())
      .replace('{{endDate}}', endDate.toDateString());

    // Enviar correo con contenido HTML
    await this.mailService.sendEmail(user.email, subject, emailContent);
  }
}
