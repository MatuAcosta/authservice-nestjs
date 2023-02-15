import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

const config = require('../dal/config');

@Module({
    imports: [ SequelizeModule.forRoot({...config, models:[], autoLoadModels: true, synchronize: true})],
    exports: [ SequelizeModule,]
})
export class DbModule {}
