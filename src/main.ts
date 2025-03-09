import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest-js Swagger Example API')
    .setDescription('Swagger Example API description')
    .setVersion('1.0')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`/docs`, app, documentFactory);
  await app.listen(3000);
}
bootstrap();
