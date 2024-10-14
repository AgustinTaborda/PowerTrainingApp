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

// import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
// import { PaymentService } from './payments.service';

// @Controller('webhook')
// export class WebhookController {
//   constructor(private readonly paymentService: PaymentService) {}

//   @Post()
//   @HttpCode(HttpStatus.OK) // Responder con 200 OK
//   async handleWebhook(@Body() notification: any) {
//     await this.paymentService.handleWebhook(notification);
//   }
// }

import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentService } from './payments.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('mercadopago')
  async handleMercadoPagoWebhook(@Req() req: Request, @Res() res: Response) {
    // const token = req.headers['authorization'];

    // // Verificar que el token sea válido
    // if (token !== `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`) {
    //   return res.status(401).send('Unauthorized: Invalid token');
    // }
    try {
      const { type, data } = req.body;

      if (type === 'payment') {
        // Procesar la verificación del pago
        await this.paymentService.processPaymentNotification(data.id);
      }

      return res.status(200).send('Webhook recibido con éxito');
    } catch (error) {
      console.error('Error en el webhook de Mercado Pago:', error);
      return res.status(500).send('Error procesando el webhook');
    }
  }
}
