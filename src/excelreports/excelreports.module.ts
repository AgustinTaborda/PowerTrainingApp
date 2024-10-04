import { Module } from '@nestjs/common';
import { ExcelreportsService } from './excelreports.service';
import { ExcelreportsController } from './excelreports.controller';
import { ExercisesModule } from '../exercises/exercises.module';

@Module({
  imports: [ExercisesModule],
  controllers: [ExcelreportsController],
  providers: [ExcelreportsService],
})
export class ExcelreportsModule {}
