import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseEntity } from 'src/exercises/entities/exercise.entity';
import { Repository } from 'typeorm';
import { Workbook } from 'exceljs';
import { Response } from 'express';
import { connectionSource } from '../config/typeormConfig';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class ExcelreportsService {
  constructor(
    @InjectRepository(ExerciseEntity)
    private execisesRepository: Repository<ExerciseEntity>,
  ) {}


  async generateExcel(response: Response): Promise<void> {
    const data = await this.execisesRepository.find(); 

    await this.generateExcelReport(data,response);
       
  }
  async genericReport(response: Response,query: string) {
    
     
    try{ 
    await connectionSource.initialize();
    const data = await connectionSource.query(query);//"SELECT * FROM exercises where tags like '%cardio%'");
    console.log(data);
    await this.generateExcelReport(data,response);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    finally {
      await connectionSource.destroy();
    }
   
  //response.send(data);
  //return "hola"
  }


async  generateExcelReport(data,response) {
  try{
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Report');
  response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  response.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');

  if (data.length > 0) {

      // Obtener la metadata
      const metadata = Object.keys(data[0]); // Claves del primer objeto

      // Definir encabezados dinámicamente
      worksheet.columns = metadata.map(key => {
          // Puedes ajustar el ancho según la longitud máxima de los valores si es necesario
          const width = Math.max(...data.map(item => item[key] ? item[key].toString().length : 0), key.length) + 2;
          return { header: key.charAt(0).toUpperCase() + key.slice(1), key: key, width: width };
      });

      // Agregar los datos
      data.forEach(item => {
          worksheet.addRow(item); // Agrega cada objeto como una fila
      });
  }

  // Guarda el archivo
  await workbook.xlsx.write(response);
  response.end();
  console.log('Reporte generado: reporte.xlsx');
}catch(error){
  return  new HttpException('An error occurred while generating the report: '+ error.message, HttpStatus.INTERNAL_SERVER_ERROR);
}
}

}
