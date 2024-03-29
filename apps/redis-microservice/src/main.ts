import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RedisMicroserviceModule } from './redis-microservice.module';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RedisMicroserviceModule, {
    transport: Transport.REDIS,
    options:{
      host:'localhost',
      port:6379
    }
  })
  await app.listen();
}
bootstrap();
