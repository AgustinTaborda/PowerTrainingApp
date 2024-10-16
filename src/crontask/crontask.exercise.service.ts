import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseEntity } from '../exercises/entities/exercise.entity';
import { Status } from '../exercises/types/status.enum';
import { Repository } from 'typeorm';


@Injectable()
export class CronTasksService {

  private readonly logger = new Logger(CronTasksService.name);

  private static readonly EVERY_3_MINUTES = '*/3 * * * *';
    constructor(
      @InjectRepository(ExerciseEntity) private exercisesRepository: Repository<ExerciseEntity>
    ) {}
 

  
 

  @Cron(CronExpression.EVERY_HOUR)

  handleCron() {
   // this.logger.debug('Called every 30 seconds');
   this.moveTrashToInactive();
  }

  async moveTrashToInactive(): Promise<void> {
    try{
    await this.exercisesRepository
      .createQueryBuilder()
      .update()
      .set({ status: Status.INACTIVE })
      .where('status = :status', { status: 'trash' })
      .execute();
     console.log('Exercises moved to inactive');
    
    
  }catch(error){
    console.log(error)
  }
}
}