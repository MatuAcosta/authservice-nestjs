import { Inject, Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { Role } from "../entity/role.model";

@Injectable()
export class RoleRepository {
    sequelize: Sequelize
    constructor(@Inject('ROLE_REPOSITORY') private role: typeof Role) {
    }
    async findOne(name: string): Promise<Role>{
        return await this.role.findOne({
            where: {
                name
            }
        })
    }

    async findOneById(id:number): Promise<Role>{
        return await this.role.findByPk(id);
    }

}