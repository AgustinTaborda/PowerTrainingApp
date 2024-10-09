import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { NotificationscheduleEntity } from '../notificationschedule/entities/notificationschedule.entity';
import { UserEntity } from '../users/entities/user.entity';
import { MailService } from '../mailer/mailer.service';
import { DateManager } from '../helpers/datemanager';


@Injectable()
export class CronTasksNotificationSender {
 
    constructor(
      @InjectRepository(NotificationscheduleEntity) private notificationScheduleRepository: Repository<NotificationscheduleEntity>,
      @Inject(MailService) private mailService: MailService,
      @Inject(DateManager) private dateManager: DateManager
    ) {}
 
 

  @Cron(CronExpression.EVERY_10_SECONDS)

  handleCron() {
   
   this.sendNotifications();
  }


async sendNotifications() {
    // Busca las notificaciones que no se han enviado
    const notifications = await this.notificationScheduleRepository.find({
      where: { sended: false , nextSendDate: LessThan(new Date()) },
      relations: ['user','message'],
    });

    if (notifications.length > 0) {
     
    
    for (const notification of notifications) {
      const { nextSendDate } = notification;

      // Verifica si la fecha de envío es correcta
      if (this.isSendDateValid(nextSendDate)) {
        console.log(notification.user.email)
        console.log(notification.message.subject)
        console.log(notification.message.body)

        const nextSendDate = this.dateManager.calculateNextSendDate(notification.periodParam,notification.periodType)
        console.log(nextSendDate)

       

          this.mailService.sendEmail(

          notification.user.email,
          notification.message.subject,
          notification.message.body

        );
    
          notification.sended = true;
          notification.lastSendedDate = new Date();
          notification.nextSendDate = nextSendDate;
        
     
          await this.notificationScheduleRepository.save(notification);
          
      }
    }
  }else{
    console.log('No hay notificaciones que enviar');
  }
  }

  // Método para verificar si la fecha de envío es válida
  private isSendDateValid(nextSendDate: Date): boolean {
    const now = new Date();
    return nextSendDate <= now; // Verifica si la fecha de envío es anterior o igual a la fecha actual
  }

  
}