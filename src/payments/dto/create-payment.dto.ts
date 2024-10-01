import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  userId: string;
  planId: string;
  cartItems: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}
