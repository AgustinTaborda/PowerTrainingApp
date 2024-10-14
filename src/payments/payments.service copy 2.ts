import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { SubscriptionEntity } from '../subscriptions/entities/subscription.entity';
import { SubscriptionPlan } from '../subscriptions/entities/subscriptionPlan.entity';
import { MailService } from '../mailer/mailer.service';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PaymentService {
  private mercadoPagoClient: MercadoPagoConfig;
  private dataFilePath = 'subscriptions.json'; // Ruta al archivo de datos

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
    const subscriptionPlan = await this.subscriptionPlanRepository.findOne({
      where: { id: planId },
    });

    if (!subscriptionPlan) {
      throw new Error('Plan de suscripción no encontrado');
    }

    const items = cartItems.map((item) => ({
      id: item.id,
      title: item.name,
      unit_price: item.price,
      quantity: item.quantity,
      currency_id: 'ARS',
    }));

    try {
      const preference = await new Preference(this.mercadoPagoClient).create({
        body: {
          items: items,
          back_urls: {
            success: `${process.env.FRONTEND_URL}/notification/success`,
            failure: `${process.env.FRONTEND_URL}/pricing`,
            pending: `${process.env.FRONTEND_URL}/dashboard/notification/pending`,
          },
          auto_return: 'approved',
        },
      });

      console.log(preference);

      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(
        startDate.getMonth() + subscriptionPlan.durationInMonths,
      );

      const subscription = new SubscriptionEntity();
      subscription.user = user;
      subscription.subscriptionPlan = subscriptionPlan;
      subscription.paymentStatus = 'pending';
      subscription.subscriptionStartDate = startDate;
      subscription.subscriptionEndDate = endDate;

      await this.subscriptionRepository.save(subscription);

      user.isSubscribed = true;
      user.subscriptionEndDate = endDate;

      await this.userRepository.save(user);

      await this.sendEmailBasedOnStatus(
        user,
        subscriptionPlan,
        startDate,
        endDate,
        'pending',
      );

      // Almacenar la suscripción en un archivo como un array de objetos
      this.storeSubscriptionAsArray(subscription);

      return preference.init_point; // Devuelve la URL de pago a la aplicación frontend
    } catch (error) {
      console.error('Error al crear la preferencia de pago:', error);
      throw new Error('Error al crear la preferencia de pago');
    }
  }

  async handleWebhook(notification: any) {
    const paymentId = notification.data.id; // Obtener el ID del pago de la notificación

    try {
      // Obtener detalles del pago desde la API de Mercado Pago
      const payment = await new Payment(this.mercadoPagoClient).get({
        id: paymentId,
      });

      // Comprobar si el pago fue aprobado
      if (payment.status === 'approved') {
        const subscription = await this.subscriptionRepository.findOne({
          where: { paymentId: paymentId }, // Asegúrate de que el paymentId se guarde correctamente en tu suscripción
          relations: ['user', 'subscriptionPlan'],
        });

        if (subscription) {
          subscription.paymentStatus = payment.status; // Actualiza el estado del pago
          await this.subscriptionRepository.save(subscription); // Guarda los cambios

          // Envía un correo basado en el estado del pago
          await this.sendEmailBasedOnStatus(
            subscription.user,
            subscription.subscriptionPlan,
            subscription.subscriptionStartDate,
            subscription.subscriptionEndDate,
            payment.status,
          );
        }
      } else {
        // Maneja otros estados del pago si es necesario
        console.log(
          `El pago con ID ${paymentId} no está aprobado. Estado actual: ${payment.status}`,
        );
      }
    } catch (error) {
      console.error('Error al procesar el webhook:', error);
    }
  }

  async sendEmailBasedOnStatus(
    user: UserEntity,
    subscriptionPlan: SubscriptionPlan,
    startDate: Date,
    endDate: Date,
    status: string,
  ) {
    let templatePath: string;
    let subject: string;

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

    let emailContent = fs.readFileSync(templatePath, 'utf8');

    emailContent = emailContent
      .replace('{{name}}', user.name)
      .replace('{{planName}}', subscriptionPlan.name)
      .replace('{{duration}}', subscriptionPlan.durationInMonths.toString())
      .replace('{{price}}', subscriptionPlan.price.toString())
      .replace('{{startDate}}', startDate.toDateString())
      .replace('{{endDate}}', endDate.toDateString());

    await this.mailService.sendEmail(user.email, subject, emailContent);
  }

  private storeSubscriptionAsArray(subscription: SubscriptionEntity) {
    let subscriptions = [];
    if (fs.existsSync(this.dataFilePath)) {
      const data = fs.readFileSync(this.dataFilePath, 'utf8');
      subscriptions = JSON.parse(data);
    }
    subscriptions.push(subscription);
    fs.writeFileSync(this.dataFilePath, JSON.stringify(subscriptions, null, 2));
  }
}
