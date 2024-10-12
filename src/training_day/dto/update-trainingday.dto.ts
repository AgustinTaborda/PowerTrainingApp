import { PartialType } from '@nestjs/swagger';
import { CreateTrainingDayDto } from './create-trainingday.dto';

export class UpdateTrainingDayDto extends PartialType(CreateTrainingDayDto) {}
