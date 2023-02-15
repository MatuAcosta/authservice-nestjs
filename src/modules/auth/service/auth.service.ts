import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RoleService } from 'src/modules/roles/service/role.service';
import { jwtConstants } from '../jwt.constants';
@Injectable()
export class AuthService {

    constructor(private roleService: RoleService, private userService: UserService, private jwtService:JwtService){}

    async validateUser(email:string , password: string) {
        const user = await this.userService.findOneByEmail(email);
        if(!user) throw new BadRequestException('User not exists');
        const match = await bcrypt.compare(password,user.password);
        if(user && match) {
            const {password, ...result} = user;
            console.log('RESULT', result);
            return result; 
        }
        return null;
    }

    async validateRole(email:string){
        const user = await this.userService.findOneByEmail(email);
        if(!user) throw new BadRequestException('User do not exists');
        let role = await this.roleService.findOne(user.role);
        if(role.name === 'admin') return true ; 
        return false 
    }

    async checkRegister(email: string):Promise<boolean>  {
        const foundUser = await this.userService.findOneByEmail(email);
        if(foundUser){
            return true
        }
        return false
    }

    async login(user:any){
        const payload = {email: user.email, sub: user.id};
        let token =  this.jwtService.sign(payload); 
        return token
    }
}
