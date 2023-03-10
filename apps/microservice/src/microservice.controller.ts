import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MicroserviceService } from './microservice.service';

@Controller()
export class MicroserviceController {
  constructor(private readonly microserviceService: MicroserviceService) {}


  @EventPattern('new_mail')
  handleNewMail(data:any){
    console.log('este es el evento entrante', data);
  }

  
}
