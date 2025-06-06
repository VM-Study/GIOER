import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfiguration } from './config/app-configuration.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const configService = app.get(AppConfiguration);

  const config = new DocumentBuilder()
    .setTitle('GIOER API')
    .setDescription('API description for GNU Image Online Extension Repository')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  await app.listen(configService.appPort);
  Logger.log(
    `🚀 Application is running on: http://localhost:${configService.appPort}/${globalPrefix}`,
  );
  Logger.log(
    `📚 Swagger is available on: http://localhost:${configService.appPort}/spec`,
  );
  Logger.log(
    `📚 Swagger YAML is available on: http://localhost:${configService.appPort}/spec-yaml`,
  );
}

bootstrap();
