import { Test, TestingModule } from '@nestjs/testing';
import { RedisMicroserviceController } from './redis-microservice.controller';
import { RedisMicroserviceService } from './redis-microservice.service';

describe('RedisMicroserviceController', () => {
  let redisMicroserviceController: RedisMicroserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RedisMicroserviceController],
      providers: [RedisMicroserviceService],
    }).compile();

    redisMicroserviceController = app.get<RedisMicroserviceController>(RedisMicroserviceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(redisMicroserviceController.getHello()).toBe('Hello World!');
    });
  });
});
