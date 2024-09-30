import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRoutineLogDto } from './create-user_routine_log.dto';

export class UpdateUserRoutineLogDto extends PartialType(CreateUserRoutineLogDto) {}
