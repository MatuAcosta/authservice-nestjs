import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Authentication DOC')
  .setDescription('Auth API description')
  .setVersion('1.0')
  .addSecurityRequirements('bearer')
  .addTag('users')
  .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api', app, document);


  await app.listen(3000);
}
bootstrap();
