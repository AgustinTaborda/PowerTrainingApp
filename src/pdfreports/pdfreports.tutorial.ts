import { Injectable } from '@nestjs/common';
import { join, resolve } from 'path';
const PDFDocument = require('pdfkit-table');
//import PDFDocument from 'pdfkit-table';


@Injectable()
export class PDFToolkitService {

  async generarPDF(): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise(resolve => {
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

      console.log(join(process.cwd(), "uploads/logoPower.png"));

      doc.addPage()
      doc.image(join(process.cwd(), "uploads/logoPower.png"), doc.page.width / 2 - 100, 150, { width: 200, })
      doc.text('', 0, 400)
      doc.font("Helvetica-Bold").fontSize(24);
      doc.text("POWERTRAINING - CONFIDENCIAL", {
        width: doc.page.width,
        align: 'center'
      });
      doc.moveDown();

/*
      doc.addPage();
      doc.text('', 50, 70);
      doc.font("Helvetica-Bold").fontSize(20);
      doc.text("Reporte de ganancias");
      doc.moveDown();
      doc.font("Helvetica").fontSize(16);
      doc.text("Detalle de la facturación");

*/
      doc.addPage();
      doc.text('', 50, 70)
      doc.fontSize(24);
      doc.moveDown();
      doc.font("Helvetica").fontSize(20);
      doc.text("Detalles y total", {
        width: doc.page.width - 100,
        align: 'center'
      });

      /*const table = {
        title: "Tabla ejemplo",
        subtitle: "Esta es una tabla de ejemplo",
        headers: ["id", "nombre","apellidos"],
        rows: [
            ["1", "Dev latino", "Garcia"],
            ["2", "Programadores fumados", "Garcia"],
        ]
      };*/
      const table = {
        title: "Facturación Mensual",
        subtitle: "Resumen de facturación del mes",
        headers: ["Cliente", "Monto Facturado", "Fecha de Pago"],
        rows: [
          ["Juan Pérez", "$1500", "2024-10-01"],
          ["Ana García", "$2000", "2024-10-02"],
          ["Carlos Rodríguez", "$1750", "2024-10-03"],
          ["Luis Fernández", "$3000", "2024-10-04"],
          ["Sofía Ramírez", "$1250", "2024-10-05"],
          ["Miguel Torres", "$1600", "2024-10-06"],
          ["Lucía Méndez", "$2200", "2024-10-07"],
          ["Mario López", "$1800", "2024-10-08"],
          ["Verónica Díaz", "$1450", "2024-10-09"],
          ["Carmen Herrera", "$2500", "2024-10-10"],
          ["José Hernández", "$1900", "2024-10-11"],
          ["Paola Romero", "$1700", "2024-10-12"],
          ["Alejandro Ruiz", "$1550", "2024-10-13"],
          ["Mónica Vega", "$2100", "2024-10-14"],
          ["Felipe León", "$1400", "2024-10-15"],
          ["Andrea Campos", "$2300", "2024-10-16"],
          ["Manuel Silva", "$1950", "2024-10-17"],
          ["Lorena Castro", "$1750", "2024-10-18"],
          ["Raúl Gómez", "$2150", "2024-10-19"],
          // Fila del total
          ["Total", "$37500", ""]
        ]
      };
      

      doc.table(table, {
       // columnsSize: [150, 350],
      });


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



}