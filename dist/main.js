"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const app_configuration_service_1 = require("./config/app-configuration.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true
    }));
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true
    });
    const configService = app.get(app_configuration_service_1.AppConfiguration);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('GIOER API')
        .setDescription('API description for GNU Image Online Extension Repository')
        .addBearerAuth()
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('spec', app, document);
    await app.listen(configService.appPort);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${configService.appPort}/${globalPrefix}`);
    common_1.Logger.log(`📚 Swagger is available on: http://localhost:${configService.appPort}/spec`);
    common_1.Logger.log(`📚 Swagger YAML is available on: http://localhost:${configService.appPort}/spec-yaml`);
}
bootstrap();
//# sourceMappingURL=main.js.map