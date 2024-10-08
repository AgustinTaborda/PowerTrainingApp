import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationscheduleEntity } from '../notificationschedule/entities/notificationschedule.entity';


@Injectable()
export class CronTasksNotificationSender {
 
    constructor(
      @InjectRepository(NotificationscheduleEntity) private notificationScheduleRepository: Repository<NotificationscheduleEntity>
    ) {}
 
 

  @Cron(CronExpression.EVERY_MINUTE)

  handleCron() {
   
   this.sendNotifications();
  }

 /*  async sendNotifications() {
      await this.notificationScheduleRepository.find({
        where:{
            sended:false
        }
    })
}*/

async sendNotifications() {
    // Busca las notificaciones que no se han enviado
    const notifications = await this.notificationScheduleRepository.find({
      where: { sended: false },
    });

    // Itera sobre cada notificación
    for (const notification of notifications) {
      const { nextSendDate } = notification;

      // Verifica si la fecha de envío es correcta
      if (this.isSendDateValid(nextSendDate)) {
        // Envía el correo
        await this.mailService.sendEmail(notification);

        // Marca la notificación como enviada
        notification.sended = true;
        
        // Actualiza la notificación en la base de datos
        await this.notificationScheduleRepository.save(notification);
      }
    }
  }

  // Método para verificar si la fecha de envío es válida
  private isSendDateValid(nextSendDate: Date): boolean {
    const now = new Date();
    return nextSendDate <= now; // Verifica si la fecha de envío es anterior o igual a la fecha actual
  }

  
}