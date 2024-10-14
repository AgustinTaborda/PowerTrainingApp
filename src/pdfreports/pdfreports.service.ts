import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as PDFDocument from 'pdfkit'
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { ExerciseEntity } from '../exercises/entities/exercise.entity';
import { SubscriptionEntity } from '../subscriptions/entities/subscription.entity';
import { timeStamp } from 'console';


@Injectable()
export class PdfreportsService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ExerciseEntity)
    private readonly exerciseRepository: Repository<ExerciseEntity>,
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
  ) {}


  async generatePDF(): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise(async resolve => {
    const users = await this.getUserStats();

      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      })

      

      // customize your PDF document
      doc.text('REPORTE GENERAL', 100, 50, { align: 'center',   width: 400, height: 50 });
      doc.text('REPORTE DE CLIENTES', 100, 100);

   //   const exercises = await this.findDistinctExercises();
      let currentY = 150; // Posición y inicial
  //    currentY = this.addTable(doc, exercises, currentY); // Actualiza currentY después de la primera tabla

      // Añadir la segunda tabla
      currentY = this.addTable(doc, users, currentY); // Actualiza currentY después de la segunda tabla

      doc.text('Total cobrado hasta ahora es de : $'+await this.getTotalAmountSubscriptions()
      , 100, currentY);
      
     

      doc.end();
      const buffer = []
      doc.on('data', buffer.push.bind(buffer))
      doc.on('end', () => {
        const data = Buffer.concat(buffer)
        resolve(data)
      })
    })

    return pdfBuffer
  }

  private addTable(doc: PDFKit.PDFDocument, data: Record<string, any>[], startY: number): number {
    if (data.length === 0) return startY; // Salir si no hay datos

    // Obtener todos los encabezados de forma dinámica
    const headers = Array.from(new Set(data.flatMap(Object.keys)));

    // Definir dimensiones de la tabla
    const tableWidth = 400;
    const rowHeight = 20;
    const columnWidth = tableWidth / headers.length;

    // Dibujar encabezados con color celeste
    const headerColor = '#A4D7E1'; // Color celeste
    doc.fillColor(headerColor);
    headers.forEach((header, index) => {
        doc.rect(100 + columnWidth * index, startY, columnWidth, rowHeight).fill(); // Dibujar el fondo del encabezado
    });

    // Restablecer color de texto a negro antes de dibujar el texto del encabezado
    doc.fillColor('black');
    headers.forEach((header, index) => {
        const textWidth = doc.widthOfString(header);
        const x = 100 + columnWidth * index + (columnWidth - textWidth) / 2; // Centrar el texto
        doc.text(header, x, startY, { width: columnWidth, height: rowHeight, align: 'center' }); // Alinear el texto al centro
    });

    // Dibujar líneas de grilla y las filas de la tabla
    doc.fillColor('black'); // Cambiar color a negro para el texto
    data.forEach((row, rowIndex) => {
        headers.forEach((header, colIndex) => {
            // Obtener el texto de la celda
            const cellText = row[header] !== undefined ? String(row[header]) : ''; // Convertir a cadena si es undefined
            const textWidth = doc.widthOfString(cellText);
            const x = 100 + columnWidth * colIndex + (columnWidth - textWidth) / 2; // Centrar el texto
            doc.text(cellText, x, startY + (rowIndex + 1) * rowHeight, { width: columnWidth, height: rowHeight, align: 'center' }); // Alinear el texto al centro

            // Dibujar líneas de la grilla
            doc.rect(100 + columnWidth * colIndex, startY + (rowIndex + 1) * rowHeight, columnWidth, rowHeight).stroke();
        });
    });

    // Dibujar la línea horizontal al final de la tabla (solo una vez)
    doc.rect(100, startY, tableWidth, (data.length + 1) * rowHeight).stroke();

    // Calcular y retornar la nueva posición y después de la tabla, incluyendo un espacio adicional
    const totalHeight = (data.length + 1) * rowHeight; // altura total de la tabla
    const spaceBetweenTables = 20; // Espacio adicional entre tablas
    return startY + totalHeight + spaceBetweenTables; // Nueva posición y para la siguiente tabla
}

  async getUserStats(): Promise<any> {
    const stats = await this.userRepository
      .createQueryBuilder('user')
      .select(
        `CASE 
          WHEN "isSubscribed" IS NULL THEN 'TOTAL CLIENTES' 
          WHEN "isSubscribed" = FALSE THEN 'CLIENTES NO SUBSCRIPTOS'
          WHEN "isSubscribed" = TRUE THEN 'CLIENTES SUBSCRIPTOS' 
        END AS "DESCRIPTION"`
      )
      .addSelect('COUNT(*) AS TOTAL')
      .groupBy('ROLLUP("isSubscribed")') // Nota: ROLLUP no se usa directamente en TypeORM.
      .getRawMany();

    return stats;
  }
  
    async findDistinctExercises(): Promise<{ name: string; description: string }[]> {
      return this.exerciseRepository
        .createQueryBuilder('exercises')
        .select('exercises.name', 'name')
        .addSelect('exercises.description', 'description')
        .getRawMany(); // Devuelve los resultados como un array de objetos
    }

    async getTotalAmountSubscriptions(): Promise<number> {
      const subscriptions = await this.subscriptionRepository.find({relations: ['user', 'subscriptionPlan']});
      const onlyMoney: { price: number }[] = subscriptions.map((subscription) => ({
        price: parseFloat(subscription.subscriptionPlan.price.toString()) // Convertir a número
      }));

      console.log(onlyMoney)


      const totalPrice = onlyMoney.reduce((accumulator:number, current) => {
        return accumulator + current.price; // Sumar el precio actual al acumulador
      }, 0); // Inicializamos el acumulador en 0
      
      console.log('Total Price:', totalPrice)

    
     return totalPrice
    }
  
}
 

