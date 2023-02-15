import { IsString, IsEmail, IsAlphanumeric, IsNotEmpty } from "class-validator";
import {AutoMap} from '@automapper/classes';
import { PartialType } from "@nestjs/mapped-types";

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    @AutoMap()
    name: string;
    @IsEmail()
    @IsNotEmpty()
    @AutoMap()
    email: string;
    @IsAlphanumeric()
    @IsNotEmpty()
    @AutoMap()
    password: string;
    @AutoMap()
    roles?: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
    role_id?: number
}

export class GetUserSecureDTO {
    @AutoMap()
    id:number;

    @AutoMap()
    name:string;

    @AutoMap()
    email:string;

}

export class GetUserDTO {
    @AutoMap()
    id:number;

    @AutoMap()
    name:string;

    @AutoMap()
    email:string;

    @AutoMap()
    password:string;

    @AutoMap()
    role?: string;
}