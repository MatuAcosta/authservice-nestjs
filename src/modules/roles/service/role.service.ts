import { Injectable } from '@nestjs/common';
import { Role } from '../entity/role.model';
import { RoleRepository } from '../repository/roles.repository';

@Injectable()
export class RoleService {
    constructor(private roleRepository: RoleRepository){}

    async findOne(name:string): Promise<Role>{
        return this.roleRepository.findOne(name);
    }
    async findOneById(id:number): Promise<Role>{
        return this.roleRepository.findOneById(id);
    }
}
