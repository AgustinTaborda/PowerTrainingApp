import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
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
import { ConfigModule, ConfigService } from '@nestjs/config';
import  typeOrmConfig  from './config/typeormConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudfileManagerModule } from './cloudfile-manager/cloudfile-manager.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ 
   
      ConfigModule.forRoot({
        isGlobal: true,
        load: [typeOrmConfig] // através de este import se trae la clave typeorm creada en el config
      }),
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService : ConfigService) => 
          configService.get('typeorm'),//esta es la clave creada en el config en typeorm.ts
      }),
    
    
    ExercisesModule, 
    AuthModule, 
    UserRoutineExerciseModule, 
    UserRoutineLogModule, 
    UsersModule, 
    SubscriptionsModule, 
    RoutinesModule, 
    PaymentsModule, 
    NotificationsModule, 
    MessagesModule, 
    UserProgressModule,
    CloudfileManagerModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h'},
      secret: process.env.JWT_SECRET
    })
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
