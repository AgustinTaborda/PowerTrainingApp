import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { TrainingDayEntity } from 'src/training_day/entities/training_day.entity';


@Entity('routines')
export class RoutineEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.routines, { nullable: false })
  user: UserEntity;

  @Column({ type: 'date', nullable: false })
  startDate: Date;

  @Column({ type: 'date', nullable: false })
  endDate: Date;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @OneToMany(() => TrainingDayEntity, (trainingDay) => trainingDay.routine)
  trainingDays: TrainingDayEntity[];
}
