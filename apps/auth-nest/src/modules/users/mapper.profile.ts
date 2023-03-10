import { createMap, forMember, ignore, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { DomainUserCreated} from "../../domain/user";
import { CreateUserDTO, GetUserDTO, GetUserSecureDTO, UpdateUserDTO } from "../../dtos/user.dto";
import { User } from "./entity/user.model";

export class UserMapperProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper){
        super(mapper);
    }
    override get profile(){
        return (mapper) => {
            createMap(mapper,DomainUserCreated,CreateUserDTO);
            createMap(mapper,CreateUserDTO,DomainUserCreated,forMember((dest)=> dest.id, ignore()));
            createMap(mapper,User,GetUserDTO);
            createMap(mapper,User,GetUserSecureDTO);
        }
    }
}