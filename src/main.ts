import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
//import { config as auth0Config } from './config/auth0.config';
import { auth } from 'express-openid-connect';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    secret: process.env.SECRET,
    /* routes: {
      login: '/auth/login',// login: false as false,  // Esto deshabilita la ruta de login por defecto si usas una personalizada
      callback: '/api'  // Define la ruta de callback para la redirección
    }*/
  };

  const app = await NestFactory.create(AppModule);
  const theme = new SwaggerTheme();

  app.use(auth(config));

  const options = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
    swaggerOptions: {
      oauth2RedirectUrl: `${process.env.BASE_URL}/api`, // Configurar redirección
      persistAuthorization: true,
    },
  };

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Api Backend PowerTrainingApp, PF Henry 17/10/2024 02:24')
    .setDescription(
      'Api con la documentación de cada endpoint disponible en la aplicación <br><ul>'+
      '<li>[DOCUMENTO PROPUESTA](https://docs.google.com/document/d/1wvy5_HF3dLqiopC9N9y4wPnM6jVAU-wKj5h8ycFf-xQ/edit?tab=t.0)<BR>'+
      '<li>[DER Diagram](https://drawdb.vercel.app/editor?shareId=3795549dae1456ea02680344f6d28ca4) <br>'+
      '<li>[TRELLO](https://trello.com/b/BG1dJjcf/powertrainingapp) <br>'+
      '<li>[MIRO](https://miro.com/app/board/uXjVKgcW6ok=/) <br>'+
      '<li>[ESTE COMMIT](https://github.com/AgustinTaborda/PowerTrainingApp/commit/149e25307dde5909783f55b6b983ce8f1e7be922) <br>'+
      '</ul>',
     
    )
    .setVersion('1.0')
    .addOAuth2({
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: `${process.env.BASE_URL}/login`, // URL de login de Auth0
          tokenUrl: `${process.env.BASE_URL}/oauth/token`, // URL del token en Auth0
          scopes: {},
        },
      },
    })
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, options);

  //app.use(auth(auth0Config));// ya crea los endpoints necesarios automágicamente
  app.enableCors();
  /*
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }));
*/

  await app.listen(3000);
}
bootstrap();
