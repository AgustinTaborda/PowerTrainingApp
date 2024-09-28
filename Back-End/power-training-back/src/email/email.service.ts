import { Injectable } from '@nestjs/common';
import { Email } from './providers/emails';
import { sendEmailDto } from './dtos/send-email.dto';

@Injectable()
export class EmailService {
    constructor(
        private emailProvider: Email,
    ){}

    async sendEmail(body: sendEmailDto) {
        try {
            const { from, subjectEmail, sendTo } = body;
            const html = this.getTemplate(body);
            await this.emailProvider.sendEmail(from, subjectEmail, sendTo, html);
        } catch (error) {
            throw error
        }
    }

    private getTemplate(body: sendEmailDto) {
        const template = this.getTemplateFile(body.template);
        const html = template.fillTemplate(body);
        return html;
    }

    private getTemplateFile(template: string) {
        const path = './templates';
        const templateFile = require(`${path}/${template}`);
        return templateFile;
    }

}
