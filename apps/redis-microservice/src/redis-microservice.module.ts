import { Module } from '@nestjs/common';
import { RedisMicroserviceController } from './redis-microservice.controller';
import { RedisMicroserviceService } from './redis-microservice.service';

@Module({
  imports: [],
  controllers: [RedisMicroserviceController],
  providers: [RedisMicroserviceService],
})
export class RedisMicroserviceModule {}
