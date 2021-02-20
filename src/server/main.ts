import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { AppModule } from './app.module';

const { SERVER_PORT, NODE_ENV } = process.env;

(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  if (NODE_ENV !== 'production') {
    const options = new DocumentBuilder().build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors): BadRequestException => new BadRequestException(
      errors.map(({ constraints }): string[] => Object.entries(constraints)
        .map(([, value]): string => value)).join()
    ),
  }));
  app.setGlobalPrefix('api');
  await app.listen(SERVER_PORT);
})();
