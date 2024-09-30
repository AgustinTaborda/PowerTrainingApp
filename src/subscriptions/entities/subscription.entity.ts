import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { SubscriptionPlan } from './subscriptionPlan.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('subscriptions')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.subscriptions)
  user: UserEntity; // Relación con el usuario

  @ManyToOne(() => SubscriptionPlan, { eager: true }) // Cargar el plan automáticamente
  subscriptionPlan: SubscriptionPlan; // Relación con el plan de suscripción

  @Column()
  paymentStatus: string; // Estado del pago, por ejemplo: "paid", "pending", etc.

  @Column({ type: 'date' })
  subscriptionStartDate: Date; // Fecha de inicio de la suscripción

  @Column({ type: 'date' })
  subscriptionEndDate: Date; // Fecha de fin de la suscripción
}
