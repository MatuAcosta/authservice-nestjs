import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './entity/role.model';
import { RolesProvider } from './entity/roles.provider';
import { RoleRepository } from './repository/roles.repository';
import { RoleService } from './service/role.service';
const config = require('../../dal/config');

@Module({
    imports:[
        SequelizeModule.forFeature([Role]),
    ],
    exports:[SequelizeModule,RoleService],
    providers:[...RolesProvider,RoleRepository, RoleService]
})
export class RolesModule {}
