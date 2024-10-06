import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ExcelreportsService } from './excelreports.service';
import { CreateExcelreportDto } from './dto/create-excelreport.dto';
import { UpdateExcelreportDto } from './dto/update-excelreport.dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { queryDto } from './dto/querydto';

@ApiTags('excelreports')
@Controller('excelreports')
export class ExcelreportsController {
  constructor(private readonly excelreportsService: ExcelreportsService) {}

  @ApiOperation({ summary: 'Generate excel report' })
  @Get('excel')
  async generateExcel(@Res() response: Response) {
    return await this.excelreportsService.generateExcel(response);
  }

  @ApiOperation({ summary: 'Generate excel report' })
  @Post('excelGeneric')
  async  genericReport(@Body() queryInput : queryDto ,@Res() response: Response) {
    //const query = "SELECT * FROM exercises where tags like '%cardio%'"
   //  console.log(queryInput.query)
    return await this.excelreportsService.genericReport(response,queryInput.query);
  }
}
