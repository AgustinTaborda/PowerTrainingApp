import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { SubscriptionEntity } from './subscription.entity';

@Entity('subscriptionsPlan')
export class SubscriptionPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  durationInMonths: number; // Duración del plan en meses (3, 6, 12)

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.subscriptionPlan)
  subscriptions: SubscriptionEntity[];
}
