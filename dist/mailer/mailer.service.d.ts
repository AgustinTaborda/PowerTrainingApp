export declare class MailService {
    private transporter;
    constructor();
    sendEmail(to: string, subject: string, text: string): Promise<void>;
}
