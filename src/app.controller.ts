import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  async getHello(){
    let res = await this.appService.getHello();
    console.log(res);
    return {
      message: res
    }
  }
}
