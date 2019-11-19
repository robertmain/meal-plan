import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { AppModule } from './app.module';
import packageFile from '../package.json';

const { name, description, version } = packageFile;

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
