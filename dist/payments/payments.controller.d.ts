import { PaymentService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentsController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createPayment(createPaymentDto: CreatePaymentDto): Promise<import("mercadopago/dist/clients/preference/commonTypes").PreferenceResponse>;
}
