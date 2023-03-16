import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RedisMicroserviceService } from './redis-microservice.service';

@Controller()
export class RedisMicroserviceController {
  constructor(private readonly redisMicroserviceService: RedisMicroserviceService) {}

  @EventPattern('new_user')
  handleNewUser(data:any){
    console.log('new user', data);
  }


}
