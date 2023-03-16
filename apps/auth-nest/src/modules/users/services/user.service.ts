import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDTO, GetUserDTO, GetUserSecureDTO, UpdateUserDTO } from '../../../dtos/user.dto';
import { User } from '../entity/user.model';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';
import { RoleService } from '../../roles/service/role.service';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { DomainUserCreated} from '../../../domain/user';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
    userRepository:UserRepository
    private salts: number = 10;
    roleService: RoleService;
    constructor(
        @Inject('USER_SERVICE') private userRedis: ClientProxy, 
        userRepository: UserRepository, 
        roleService: RoleService, 
        @InjectMapper() private readonly mapper: Mapper ){
        this.userRepository = userRepository;
        this.roleService = roleService;
    }

    async hashPassword(password:string){
        let hashedPass =  await bcrypt.hash(password,this.salts);
        return hashedPass
    }
    //the difference between findAll and findAllComplete is that this one doesnot return user password
    async findAllComplete(): Promise<GetUserSecureDTO[]>{
        const users = await this.userRepository.findAll();
        return this.mapper.mapArray(users,User,GetUserSecureDTO);
    }

    async findAll(): Promise<GetUserDTO[]>{
        const users = await this.userRepository.findAll();
        const usersMapped: GetUserDTO[] = [];
        for (const user of users) {
            const role = await this.roleService.findOneById(user.role_id)
            const userMap = this.mapper.map(user,User,GetUserDTO);
            userMap.role = role.name;
            usersMapped.push(userMap);
        }
        return usersMapped;
    }


    async findOneByEmail(email: string): Promise<GetUserDTO>{
        const user = await this.userRepository.findOne(email);
        const userMapped = this.mapper.map(user,User,GetUserDTO);
        if(user){
            const role = await this.roleService.findOneById(user.role_id);
            userMapped.role = role.name;
        }
        console.log(this.userRedis.emit('new_user',userMapped));
        return userMapped
    }
    async findOne(id: number): Promise<GetUserDTO>{
        const user = await this.userRepository.findById(id);
        const userMapped = this.mapper.map(user,User,GetUserDTO);
        if(user){
            const role = await this.roleService.findOneById(user.role_id);
            userMapped.role = role.name;
        }
        return userMapped
    }

    async create(user: CreateUserDTO): Promise<CreateUserDTO> {
        if(!user.roles) user.roles = 'user'; 
        let role = await this.roleService.findOne(user.roles);
        user.password = await this.hashPassword(user.password);
        const entity = this.mapper.map(user, CreateUserDTO, DomainUserCreated);
        role ? entity.role_id = role.id : null ;
        const userCreated = await this.userRepository.create(entity);
        this.userRedis.emit('new_user', userCreated);
        return this.mapper.map(userCreated,DomainUserCreated,CreateUserDTO);
    }

    async update(id:number, user:UpdateUserDTO):Promise<any>{
        if(user.password){
            user.password = await this.hashPassword(user.password);    
        }
        if(user.roles){
            let role = await this.roleService.findOne(user.roles);
            role ? user.role_id = role.id : null; 
        }
        let res = await this.userRepository.update(id,user);
        return res

    }



}
