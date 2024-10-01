import { EmailService } from './email.service';
import { sendEmailDto } from './dtos/send-email.dto';
export declare class EmailController {
    private emailService;
    constructor(emailService: EmailService);
    sendEmail(body: sendEmailDto): Promise<void>;
}
