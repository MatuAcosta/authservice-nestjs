import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
  constructor( private sequelize:Sequelize){}
  async getHello(){

    let res = await this.connect();
    return res
  }
  async connect(){
    try {
      await this.sequelize.authenticate();
      return ('Connection has been established successfully.');
    } catch (error) {

      return {
        msg: 'no conect',
        data: error
      };
    }
  }
}
