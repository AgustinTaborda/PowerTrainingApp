import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    const data = {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER, // 'delmer.simonis87@ethereal.email',
        pass: process.env.EMAIL_PASSWORD, // 'sH8hTjvN7jCJ9E4d',
      },
    };
    const data2 = {
      service: 'gmail', // Usar el servicio de Gmail
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, //App Password)
        //se genera de ahí  https://myaccount.google.com/u/1/apppasswords?pli=1&rapt=AEjHL4PhDudkdVVLDGiB39__2qkFJGC5F4bM1FsDNEIqFuUK0JGlkOgplxAodc7axZ2ck78zmcxj2LBvcuwvfKCVTm7UdJRLrlRJ7JgByGDSsqYVbgMcSNo&pageId=none
      },
      secure: true, // TLS
      tls: {
        rejectUnauthorized: false, // Ignora la verificación de certificado
      },
    };

    this.transporter = createTransport(data2);
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    const cc_email = process.env.EMAIL_CC
    let  mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: html,      
    }

    if (cc_email) {    // si está seteada la variable de entorno, lo ponemos en el email como copia para test
      mailOptions["cc"] = cc_email;
    }
    
   
   



    try {
      return await this.transporter.sendMail(mailOptions);
      //console.log('Email sent successfully');
    } catch (error) {
      //  console.error('Error sending email:', error);
      // throw new Error('Failed to send email');
      console.error('Error sending email:', error);
      throw new HttpException(
        'Failed to send email: ' + error + this,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
