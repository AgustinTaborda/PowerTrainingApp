import { Email } from './providers/emails';
import { sendEmailDto } from './dtos/send-email.dto';
export declare class EmailService {
    private emailProvider;
    constructor(emailProvider: Email);
    sendEmail(body: sendEmailDto): Promise<void>;
    private getTemplate;
    private getTemplateFile;
}
