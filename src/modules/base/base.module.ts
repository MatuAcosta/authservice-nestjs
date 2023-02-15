import { Module } from '@nestjs/common';
import { BaseRepository } from './repository/base.repository';

@Module({
    imports:[BaseRepository, ],
    providers:[],
    exports:[BaseRepository,]
})
export class BaseModule {}
