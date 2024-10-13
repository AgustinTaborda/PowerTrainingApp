import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ExercisesModule } from './exercises/exercises.module';
import { UserRoutineExerciseModule } from './user_routine_exercise/user_routine_exercise.module';
import { RoutineModule } from './routine/routine.module';
import { UsersModule } from './users/users.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MessagesModule } from './messages/messages.module';
import { UserProgressModule } from './user-progress/user-progress.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeormConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudfileManagerModule } from './cloudfile-manager/cloudfile-manager.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from './email/email.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronTasksService } from './crontask/crontask.exercise.service';
import { ExerciseEntity } from './exercises/entities/exercise.entity';
import { CronExercisesModule } from './crontask/crontask.exercise.module';
import { ExcelreportsModule } from './excelreports/excelreports.module';
import { TrainingDayModule } from './training_day/training_day.module';
import { NotificationscheduleModule } from './notificationschedule/notificationschedule.module';
import { CronTasksNotificationSender } from './crontask/crontask.notificationsender.service';
import { CronNotificationsenderModule } from './crontask/crontask.notificationsender.module';
import { ChatModule } from './chat/chat.module';
import { PdfreportsModule } from './pdfreports/pdfreports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig], // através de este import se trae la clave typeorm creada en el config
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'), //esta es la clave creada en el config en typeorm.ts
    }),
    ChatModule,
    AuthModule,
    ExercisesModule,
    UserRoutineExerciseModule,
    RoutineModule,
    TrainingDayModule,
    UsersModule,
    SubscriptionsModule,
    RoutineModule,
    PaymentsModule,
    NotificationsModule,
    MessagesModule,
    UserProgressModule,
    CloudfileManagerModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '200h' },
      secret: process.env.JWT_SECRET,
    }),
    EmailModule,
    ScheduleModule.forRoot(),
    CronExercisesModule,
    CronNotificationsenderModule,
    ExcelreportsModule,
    NotificationscheduleModule,
    PdfreportsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
