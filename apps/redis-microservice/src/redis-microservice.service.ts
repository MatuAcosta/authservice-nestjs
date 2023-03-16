import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisMicroserviceService {
  getHello(): string {
    return 'Hello World!';
  }
}
