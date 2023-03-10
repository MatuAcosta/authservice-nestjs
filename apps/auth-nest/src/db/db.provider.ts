import { Sequelize } from "sequelize-typescript";
import { Role } from "../modules/roles/entity/role.model";
import { User } from "../modules/users/entity/user.model";
const config = require('./config');

export const databaseProvider = [{
    provide: 'SEQUELIZE',
    useFactory: async () => {
        const sequelize = new Sequelize({...config});
        sequelize.addModels([User,Role])
        await sequelize.sync();
        return sequelize;
    }
}]
