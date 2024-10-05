import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRoutineLogDto } from './create-routine.dto';

export class UpdateUserRoutineLogDto extends PartialType(CreateUserRoutineLogDto) {}
