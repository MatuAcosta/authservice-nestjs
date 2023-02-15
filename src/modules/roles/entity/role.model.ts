import {Table,Model,Column, HasMany} from 'sequelize-typescript';
import { User } from 'src/modules/users/entity/user.model';

@Table({
    timestamps:false
})
export class Role extends Model {
    @Column 
    name:string;
    @HasMany(()=> User)
    user: User;
}