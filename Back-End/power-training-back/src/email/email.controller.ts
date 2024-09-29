import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { EmailService } from './email.service';
import { sendEmailDto } from './dtos/send-email.dto';

@Controller('email')
export class EmailController {
    constructor(
        private emailService: EmailService,
    ) {}

    @Post('send-email')
    async sendEmail(@Body() body: sendEmailDto){
        try {            
            const response = await this.emailService.sendEmail(body)
        } catch (error) {
            console.log(error);
            
            throw error
        }
    }
}
