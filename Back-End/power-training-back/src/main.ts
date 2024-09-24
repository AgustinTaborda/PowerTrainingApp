import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
//import { config as auth0Config } from './config/auth0.config';
import { auth } from 'express-openid-connect';

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
    },
  };

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Api Backend PowerTrainingApp, PF Henry ')
    .setDescription(
      'Api con la documentación de cada endpoint disponible en la aplicación',
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
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, options);

  //app.use(auth(auth0Config));// ya crea los endpoints necesarios automágicamente
  app.enableCors();
  await app.listen(3002);
}
bootstrap();
