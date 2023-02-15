import { Inject, Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { BaseRepository } from "src/modules/base/repository/base.repository";
import { User } from "../entity/user.model";

@Injectable()
export class UserRepository extends BaseRepository<User> {
    sequelize: Sequelize
    constructor(@Inject('USER_REPOSITORY') private user: typeof User) {
      super(User);
    }
    async findOne(email: string): Promise<User>{
        return await this.user.findOne({
            where: {
                email
            }
        })
    }
    async create<DomainUserCreated>(user: DomainUserCreated): Promise<DomainUserCreated> { 
        console.log('USER_REPO', user);
        return await super.create(user);
    }
    async update<UpdateUserDTO>(id:number,entity:UpdateUserDTO): Promise<any>{
        return await super.update(id,entity);
    }
                      
}