import { Injectable } from '@nestjs/common';
import { CreateExcelreportDto } from './dto/create-excelreport.dto';
import { UpdateExcelreportDto } from './dto/update-excelreport.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseEntity } from 'src/exercises/entities/exercise.entity';
import { Repository } from 'typeorm';
import { Workbook } from 'exceljs';
import { Response } from 'express';

@Injectable()
export class ExcelreportsService {
  constructor(
    @InjectRepository(ExerciseEntity)
    private execisesRepository: Repository<ExerciseEntity>,
  ) {}


  async generateExcel(response: Response): Promise<void> {
    const data = await this.execisesRepository.find(); // Obtén los datos de la BD

    data.forEach((excercise) => {
      console.log(excercise.urlVideoExample);
    });

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Report');

    // Definir encabezados
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 10 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'UrlVideoExample', key: 'urlvideoexample', width: 30 },
      
    ];

    // Agregar datos a las filas
    data.forEach((excercise) => {
      worksheet.addRow({
        name: excercise.name,
        description: excercise.description,
        urlvideoexample: excercise.urlVideoExample
      });
    });

    // Configurar la respuesta para descargar el archivo
    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');

    // Escribir el archivo a la respuesta
    await workbook.xlsx.write(response);
    response.end();
  }

}
