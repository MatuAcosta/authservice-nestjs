import { AutoMap } from '@automapper/classes';
import {Table,Model,Column, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { Role } from 'src/modules/roles/entity/role.model';

@Table({
    timestamps:false
})
export class User extends Model {

    @AutoMap()
    id: number;

    @AutoMap()
    @Column 
    name:string;

    @AutoMap()
    @Column
    email:string;

    @AutoMap()
    @Column
    password:string;
    
    @BelongsTo(() => Role)
    role: Role;

    @ForeignKey(()=> Role)
    @Column
    role_id: number;
}