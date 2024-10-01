// import { Controller, Post, Body, Req } from '@nestjs/common';
// import { PaymentService } from './payments.service';

// @Controller('webhook')
// export class WebhookController {
//   constructor(private readonly paymentService: PaymentService) {}

//   @Post()
//   async handleWebhook(@Body() body: any, @Req() req: any) {
//     // Verificar que la notificación venga de Mercado Pago (opcional)
//     const topic = req.query.topic; // Ejemplo de cómo obtener parámetros de la notificación

//     if (topic === 'payment') {
//       // Extraer el ID del pago desde la notificación
//       const paymentId = body.data.id;

//       // Procesar el pago y actualizar la base de datos
//       await this.paymentService.updatePaymentStatus(paymentId);
//     }

//     return { received: true };
//   }
// }
