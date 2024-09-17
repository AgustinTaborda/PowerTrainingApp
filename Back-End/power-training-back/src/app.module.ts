import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExercisesModule } from './exercises/exercises.module';
import { UserRoutineExerciseModule } from './user_routine_exercise/user_routine_exercise.module';
import { UserRoutineLogModule } from './user_routine_log/user_routine_log.module';
import { UsersModule } from './users/users.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { RoutinesModule } from './routines/routines.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MessagesModule } from './messages/messages.module';
import { UserProgressModule } from './user-progress/user-progress.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ ExercisesModule, UserRoutineExerciseModule, UserRoutineLogModule, UsersModule, SubscriptionsModule, RoutinesModule, PaymentsModule, NotificationsModule, MessagesModule, UserProgressModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
