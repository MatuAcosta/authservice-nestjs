import { AutoMap } from "@automapper/classes";
export class DomainUserCreated { 

    @AutoMap()
    id:number;

    @AutoMap()
    name:string;

    @AutoMap()
    email:string;

    @AutoMap()
    password:string;

    @AutoMap()
    role_id: number;
}

