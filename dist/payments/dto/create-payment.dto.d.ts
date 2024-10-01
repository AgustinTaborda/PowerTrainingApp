export declare class CreatePaymentDto {
    userId: string;
    planId: string;
    cartItems: {
        id: string;
        name: string;
        price: number;
        quantity: number;
    }[];
}
