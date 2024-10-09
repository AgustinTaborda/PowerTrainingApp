import { Role } from 'src/auth/roles.enum';
import { NotificationscheduleEntity } from '../../notificationschedule/entities/notificationschedule.entity';
import { PaymentEntity } from 'src/payments/entities/payment.entity';
import { RoutineEntity } from 'src/routine/entities/routine.entity';
import { SubscriptionEntity } from 'src/subscriptions/entities/subscription.entity';
import { SubscriptionPlan } from 'src/subscriptions/entities/subscriptionPlan.entity';
import { UserRoutineExerciseEntity } from 'src/user_routine_exercise/entities/user_routine_exercise.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ nullable: true, type: 'varchar', length: 255 }) // ID de Google OAuth
  googleId: string;

  @Column({ nullable: true })
  providerId: string;

  @Column({ nullable: true })
  provider: string;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  lastName: string;

  @Column({ nullable: true, type: 'date' })
  birthDay: Date;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User, 
  })
  role: Role;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  email: string;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  password: string;

  @Column({ default: false })
  isSubscribed: boolean; // Si el usuario tiene una suscripción activa

  @Column({ nullable: true, type: 'date', default: new Date() })
  subscriptionEndDate: Date;
  picture: string;

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.user)
  subscriptions: SubscriptionEntity[];
  
  @OneToMany(() => RoutineEntity, (routine) => routine.user)
  routines: RoutineEntity[];

  // @OneToMany(()=> UserRoutineExerciseEntity, (userRoutineExercise) => userRoutineExercise.user)
  // userRoutineExercises: UserRoutineExerciseEntity[]

  @OneToMany(() => PaymentEntity, (payments) => payments.user)
  payments: PaymentEntity[]

  @OneToMany(()=> NotificationscheduleEntity, (notificationschedule) => notificationschedule.user)
  notificationschedules: NotificationscheduleEntity[]

}
