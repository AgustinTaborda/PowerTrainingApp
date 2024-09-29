import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

@Injectable()
export class Email {

    // manejar por variables de entorno
    private transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true, // true for port 465, false for other ports.
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    async sendEmail(from: any, subjectEmail: any, sendTo: any, html: any) {
        try {
            const info = await this.transporter.sendMail({
                from: from, 
                to: sendTo, // list of receivers
                subject: subjectEmail, 
                // text: "Hello world?", 
                html: html, 
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        } catch (error) {
            throw error
        }
    }
}
