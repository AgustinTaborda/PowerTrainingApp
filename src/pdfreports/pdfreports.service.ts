import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as PDFDocument from 'pdfkit'
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { ExerciseEntity } from '../exercises/entities/exercise.entity';
import { SubscriptionEntity } from '../subscriptions/entities/subscription.entity';
import { timeStamp } from 'console';
import { RoutineEntity } from 'src/routine/entities/routine.entity';
import { TrainingDayEntity } from 'src/training_day/entities/training_day.entity';


@Injectable()
export class PdfreportsService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ExerciseEntity)
    private readonly exerciseRepository: Repository<ExerciseEntity>,
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
    @InjectRepository(RoutineEntity)
    private readonly routineRepository: Repository<RoutineEntity>,
    @InjectRepository(TrainingDayEntity)
    private readonly trainingDayRepository: Repository<TrainingDayEntity>,
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


    async generateActiveRoutinesPDF(): Promise<Buffer> {
      const today = new Date();
      const pdfBuffer: Buffer = await new Promise(async resolve => {
        const doc = new PDFDocument({ size: 'LETTER', bufferPages: true });
  
        doc.text('Reporte de Rutinas Activas', 100, 50, { align: 'center', width: 400, height: 50 });
  
        // Obtener rutinas activas entre la fecha de inicio y final
        const activeRoutines = await this.routineRepository
          .createQueryBuilder('routine')
          .leftJoinAndSelect('routine.user', 'user')
          .leftJoinAndSelect('routine.trainingDays', 'trainingDays')
          .leftJoinAndSelect('trainingDays.exercises', 'exercises')
          .leftJoinAndSelect('exercises.exercise', 'exercise')
          .where('routine.startDate <= :today AND routine.endDate >= :today', { today })
          .getMany();
  
        if (activeRoutines.length === 0) {
          doc.text('No hay rutinas activas en la fecha actual.', 100, 100);
        } else {
          activeRoutines.forEach((routine, index) => {
            const startY = 100 + index * 350; // Ajusta la posición vertical de cada rutina
            doc.text(`Usuario: ${routine.user.name}`, 100, startY);
            doc.text(`Rutina: ${routine.name}`, 100, startY + 20);
            doc.text(`Descripción: ${routine.description || 'Sin descripción'}`, 100, startY + 40);
            doc.text(`Fecha de inicio: ${routine.startDate}`, 100, startY + 60);
            doc.text(`Fecha de fin: ${routine.endDate}`, 100, startY + 80);
  
            // Listar los días de entrenamiento y los ejercicios
            routine.trainingDays.forEach((day, dayIndex) => {
              // Título del día
              const dayStartY = startY + 100 + dayIndex * 100;
              doc.text(`Día ${dayIndex + 1}:`, 100, dayStartY);

              // Y inicial para los ejercicios
              let exerciseY = dayStartY + 20; // Asegúrate de que los ejercicios empiecen un poco más abajo

              day.exercises.forEach((exercise, exIndex) => {
                // Verificar si se necesita una nueva página
                if (exerciseY > 700) { // Si te acercas al final de la página (ajusta según sea necesario)
                  doc.addPage();
                  exerciseY = 50; // Reiniciar la posición Y
                }

                // Mostrar el ejercicio y sus detalles
                doc.text(`Ejercicio: ${exercise.exercise.name}`, 120, exerciseY);
                exerciseY += 15; // Espacio para el siguiente renglón

                doc.text(`Descripción: ${exercise.exercise.description}`, 120, exerciseY);
                exerciseY += 15; // Espacio para el siguiente renglón

                doc.text(`Series: ${exercise.series}`, 120, exerciseY);
                exerciseY += 15; // Espacio para el siguiente renglón

                doc.text(`Repeticiones: ${exercise.repetitions}`, 120, exerciseY);
                exerciseY += 15; // Espacio para el siguiente renglón

                if (exercise.weight !== null && exercise.weight !== undefined) {
                  doc.text(`Peso: ${exercise.weight}`, 120, exerciseY);
                  exerciseY += 15; // Espacio para el siguiente renglón
                }

                if (exercise.rpe !== null && exercise.rpe !== undefined) {
                  doc.text(`RPE: ${exercise.rpe}`, 120, exerciseY);
                  exerciseY += 15; // Espacio para el siguiente renglón
                }

                // Incrementar espacio adicional entre ejercicios
                exerciseY += 10; // Espacio entre diferentes ejercicios
              });
            });

        
          });
        }
  
        doc.end();
        const buffer = [];
        doc.on('data', buffer.push.bind(buffer));
        doc.on('end', () => {
          const data = Buffer.concat(buffer);
          resolve(data);
        });
      });
  
      return pdfBuffer;
    }
  
}
 

