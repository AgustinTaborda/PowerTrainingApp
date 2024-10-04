import { PartialType } from '@nestjs/swagger';
import { CreateExcelreportDto } from './create-excelreport.dto';

export class UpdateExcelreportDto extends PartialType(CreateExcelreportDto) {}
