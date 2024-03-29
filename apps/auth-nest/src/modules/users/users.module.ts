import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils/forward-ref.util';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { BaseModule } from '../base/base.module';
import { MailsenderModule } from '../mailsender/mailsender.module';
import { RolesModule } from '../roles/roles.module';
import { UserController } from './controller/user.controller';
import { User } from './entity/user.model';
import { UserProvider } from './entity/user.provider';
import { UserMapperProfile } from './mapper.profile';
import { UserRepository } from './repository/user.repository';
import { UserService } from './services/user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
    imports:[ 
        SequelizeModule.forFeature([User]),
        forwardRef(()=> AuthModule), 
        BaseModule,
        RolesModule,
        MailsenderModule,
        ClientsModule.register([
        {   
            name:'USER_SERVICE', 
            transport: Transport.REDIS,
            options:{
                host:'localhost',
                port:6379
            }
        }
        ])
    ],
    exports:[UserService],
    controllers:[UserController],
    providers:[UserService,UserRepository,...UserProvider,SequelizeModule, UserMapperProfile]
})
export class UsersModule {}
