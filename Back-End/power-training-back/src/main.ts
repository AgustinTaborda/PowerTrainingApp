import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const theme = new SwaggerTheme();

const options = {
  explorer: true,
  customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK)
};

  const swaggerConfig = new DocumentBuilder()
                        .setTitle('Api Backend PowerTrainingApp, PF Henry ')
                        .setDescription('Api con la documentación de cada endpoint disponible en la aplicación')
                        .setVersion('1.0')
                        .addBearerAuth()
                        .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document,options);

  await app.listen(3000);
}
bootstrap();
