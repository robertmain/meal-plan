import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

const {
  name,
  description,
  version,
} = require('../package.json');

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle((name[0].toUpperCase() + name.slice(1)).replace(/-/gi, ' '))
    .setDescription(description)
    .setVersion(version)
    .addTag('ingredient')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors): BadRequestException => new BadRequestException(
      errors.map(({ constraints }): string[] => Object.entries(constraints)
        .map(([, value]): string => value)).join()
    ),
  }));
  await app.listen(3000);
}
bootstrap();
