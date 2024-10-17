import { Injectable } from '@nestjs/common';
import { join, resolve } from 'path';
import { UserEntity } from '../users/entities/user.entity';
import { user } from './mockuser';
import axios from 'axios';
const PDFDocument = require('pdfkit-table');
//import PDFDocument from 'pdfkit-table';


@Injectable()
export class PDFToolkitService2 {

  writeCentrered(doc: PDFKit.PDFDocument, text: string) {
    doc.text(text, {
      width: doc.page.width,
      align: 'center'
    });
    doc.moveDown();//Espacio 

  }
  addNewPage(doc: PDFKit.PDFDocument) {
    doc.addPage();
      doc.text('', 50, 70)
      doc.fontSize(24);
      doc.moveDown();
      doc.font("Helvetica").fontSize(20);
    
  }

  async generarPDF(userEntity: UserEntity): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise(async resolve => {
      const doc = new PDFDocument(
        {
          size: "LETTER",
          bufferPages: true,
          autoFirstPage: false,
        })

      let pageNumber = 0;
      doc.on('pageAdded', () => {
        pageNumber++
        let bottom = doc.page.margins.bottom;

        if (pageNumber > 1) {
          doc.image(join(process.cwd(), "uploads/logoPower.png"), doc.page.width - 100, 5, { fit: [45, 45], align: 'center' })
          doc.moveTo(50, 55)
            .lineTo(doc.page.width - 50, 55)
            .stroke();
        }

        doc.page.margins.bottom = 0;
        doc.font("Helvetica").fontSize(14);
        doc.text(
          'Pág. ' + pageNumber,
          0.5 * (doc.page.width - 100),
          doc.page.height - 50,
          {
            width: 100,
            align: 'center',
            lineBreak: false,
          })
        doc.page.margins.bottom = bottom;
      })

      

      doc.addPage()
      doc.image(join(process.cwd(), "uploads/logoPower.png"), doc.page.width / 2 - 100, 150, { width: 200, })
      doc.text('', 0, 400)
      doc.font("Helvetica-Bold").fontSize(24);

      this.writeCentrered(doc, "Routines Report"); 
      this.writeCentrered(doc, userEntity.name+" "+userEntity.lastName);
      
      

      doc.addPage();
      doc.text('', 50, 70)
      doc.fontSize(24);
      doc.moveDown();
      doc.font("Helvetica").fontSize(20);
      doc.text("This is your graphic status", {
        width: doc.page.width - 100,
        align: 'center'
      });



      let rows = [];
      let completedCount = 0;
      const rutinas = user.routines;
      // Recorremos cada rutina
      rutinas.forEach(rutina => {
        // Recorremos cada día de entrenamiento
        rutina.trainingDays.forEach(trainingDay => {
          // Recorremos cada ejercicio en el día de entrenamiento
          trainingDay.exercises.forEach(exercise => {
            // Agregamos una fila por cada ejercicio con el formato correcto
            rows.push([
              rutina.name,
              trainingDay.date,
              trainingDay.description,
              exercise.exercise.name, // Nombre del ejercicio
              exercise.series, // Series
              exercise.repetitions, // Repeticiones
              exercise.weight, // Peso
              exercise.rpe ? exercise.rpe : 'N/A', // RPE (si no hay, poner N/A)
              exercise.completed ? 'YES' : 'NO' // Completado (YES/NO)
            ]);

            if (exercise.completed) {
              completedCount++;
            }

          });
        });
      });
      const completedPercentage = (completedCount * 100) / rows.length ;

      const table = {
        title: "Routines Account: " + rutinas.length,
        subtitle: "Exercises Summary: " + rows.length,
        headers: ["RUT.NAME","DATE","TRAIN.DESCR","EXERC.NAME", "SERIES", "REPET", "WEIGHT", "RPE", "COMPLETED"],
        rows: rows, // Aquí están todas las filas generadas
      };

      doc.table(table, {
       // columnsSize: [150, 350],
      });

    
      this.addNewPage(doc);
       // Generar la URL del gráfico con QuickChart
       const chartUrl : string = await this.getGraphics(completedPercentage);
      
  
      
       const response =  await axios.get(chartUrl, { responseType: 'arraybuffer' });
       const chartImageBuffer = Buffer.from(response.data, 'binary');
   
       // Añadir el gráfico al PDF
       doc.image(chartImageBuffer, { fit: [500, 300], align: 'center', valign: 'center' });

      const buffer = []
      doc.on('data', buffer.push.bind(buffer))
      doc.on('end', () => {
        const data = Buffer.concat(buffer)
        resolve(data)
      })
      doc.end()


    })

    return pdfBuffer;

  }

async   getGraphics(value:number): Promise<string> {

const QuickChart = require('quickchart-js');

const chart = new QuickChart();

chart.setWidth(500)
chart.setHeight(300);
chart.setVersion('2');

chart.setConfig({
  type: 'gauge',
  data: {
    labels: ['Come on!', 'Watch out!', 'You are doing great!', 'Keep it up!', 'You are a Machine!!!'],
    datasets: [
      {
        data: [20, 40, 60, 80, 100],
        value: value,
        minValue: 0,
        backgroundColor: ['red', 'orange', 'green', 'blue', 'purple'],
        borderWidth: 2,
      },
    ],
  },
  options: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'PowerTrainmeter',
    },
    needle: {
      radiusPercentage: 1,
      widthPercentage: 1,
      lengthPercentage: 60,
      color: '#000',
    },
    valueLabel: {
      fontSize: 32,
      backgroundColor: 'transparent',
      color: '#000',
      formatter: function (value, context) {
        return value + ' mph';
      },
      bottomMarginPercentage: 10,
    },
    plugins: {
      datalabels: {
        display: 'auto',
        formatter: function (value, context) {
          return context.chart.data.labels[context.dataIndex];
        },
        color: '#fff',
      },
    },
  },
});

// Print the chart URL
//console.log(chart.getUrl());

// Get the image...
//const image = await chart.toBinary();

// Or write it to a file
//chart.toFile('chart.png');

return chart.getUrl();
  }



}