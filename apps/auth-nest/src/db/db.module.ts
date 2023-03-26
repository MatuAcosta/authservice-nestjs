import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

const config = require('./config');
console.log("CONFIG CONFIG ACTUALIZA",config);
@Module({
    imports: [ SequelizeModule.forRoot({...config, dialect: 'postgres' , models:[], autoLoadModels: true, synchronize: true})],
    exports: [ SequelizeModule]
})
export class DbModule {}
