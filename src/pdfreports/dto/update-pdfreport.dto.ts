import { PartialType } from '@nestjs/swagger';
import { CreatePdfreportDto } from './create-pdfreport.dto';

export class UpdatePdfreportDto extends PartialType(CreatePdfreportDto) {}
