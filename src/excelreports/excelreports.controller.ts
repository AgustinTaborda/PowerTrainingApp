import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ExcelreportsService } from './excelreports.service';
import { CreateExcelreportDto } from './dto/create-excelreport.dto';
import { UpdateExcelreportDto } from './dto/update-excelreport.dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { queryDto } from './dto/querydto';

@ApiTags('REPORTS')
@Controller('excelreports')
export class ExcelreportsController {
  constructor(private readonly excelreportsService: ExcelreportsService) {}

  @ApiOperation({ summary: 'Generate excel report' })
  @Get('getAllExercises')
  async getAllExercises(@Res() response: Response) {
    return await this.excelreportsService.getAllExercises(response);
  }

  /*@ApiOperation({ summary: 'Generate excel report' })
  @Post('excelGeneric')
  async  genericReport(@Body() queryInput : queryDto ,@Res() response: Response) {
    //const query = "SELECT * FROM exercises where tags like '%cardio%'"
   //  console.log(queryInput.query)
    return await this.excelreportsService.genericReport(response,queryInput.query);
  }*/
  @ApiOperation({ summary: 'Sales Report' })
  @Get('salesReport')
  async  salesReport(@Res() response: Response) {
    //@Param('datefrom')datefrom: string,@Param('dateto')dateto: string,
    
    const query = 
    "SELECT " +
    "sup.name AS Subscription_plan_name, " + // Agregando 'AS' para mayor claridad
    "sup.price, " +
    "min(su.\"subscriptionStartDate\") AS Min_SubscriptionStartDate, " + // Agregando 'AS' para mayor claridad
    "max(su.\"subscriptionStartDate\") AS Max_SubscriptionStartDate, " +
    "COUNT(1) AS total_count " + // Espacio al final para separar las partes
    "FROM " +
    "public.\"subscriptions\" su " + // Espacio al final para separar las partes
    "INNER JOIN " +
    "public.\"subscriptionsPlan\" sup " + // Espacio al final para separar las partes
    "ON " +
    "su.\"subscriptionPlanId\" = sup.id " + // Espacio al final para separar las partes
    "GROUP BY " +
    "sup.name, sup.price;"; // Espacio al final para separar las partes
   
    return await this.excelreportsService.genericReport(response,query);
  }
  @ApiOperation({ summary: 'All database users Report' })
  @Get('AllUsers')
  async  AllUsers(@Res() response: Response) {
    
    const query = "SELECT users.\"name\",users.\"lastName\",users.\"birthDay\",users.\"email\",users.\"subscriptionEndDate\",users.\"isSubscribed\",users.\"role\" FROM public.\"users\";"
    return await this.excelreportsService.genericReport(response,query);
  }
  @ApiOperation({ summary: 'All database users routines Report' })
  @Get('AllRoutines')
  async  AllRoutines(@Res() response: Response) {
    
    const query = "SELECT * FROM public.reporte_rutine;"
    return await this.excelreportsService.genericReport(response,query);
  }
}
