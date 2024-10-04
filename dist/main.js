"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const swagger_themes_1 = require("swagger-themes");
const express_openid_connect_1 = require("express-openid-connect");
async function bootstrap() {
    const config = {
        authRequired: false,
        auth0Logout: true,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        secret: process.env.SECRET,
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const theme = new swagger_themes_1.SwaggerTheme();
    app.use((0, express_openid_connect_1.auth)(config));
    const options = {
        explorer: true,
        customCss: theme.getBuffer(swagger_themes_1.SwaggerThemeNameEnum.DARK),
        swaggerOptions: {
            oauth2RedirectUrl: `${process.env.BASE_URL}/api`,
            persistAuthorization: true,
        },
    };
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Api Backend PowerTrainingApp, PF Henry 01102024')
        .setDescription('Api con la documentación de cada endpoint disponible en la aplicación')
        .setVersion('1.0')
        .addOAuth2({
        type: 'oauth2',
        flows: {
            authorizationCode: {
                authorizationUrl: `${process.env.BASE_URL}/login`,
                tokenUrl: `${process.env.BASE_URL}/oauth/token`,
                scopes: {},
            },
        },
    })
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document, options);
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map