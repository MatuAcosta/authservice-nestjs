import { IsString, IsEmail, IsAlphanumeric, IsNotEmpty, isEmail } from "class-validator";
import {AutoMap} from '@automapper/classes';
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { ApiPropertyOptional } from "@nestjs/swagger/dist/decorators";

export class CreateUserDTO {
    @ApiProperty({
        type: String
    })
    @AutoMap()
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty({
        type: String
    })
    @AutoMap()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @ApiProperty({
        type: String
    })
    @AutoMap()
    @IsAlphanumeric()
    @IsNotEmpty()
    password: string;
    @ApiPropertyOptional({
        type: String
    })
    @AutoMap()
    roles?: string;
}

export class LoginDTO {
    @ApiProperty({
        type: String
    })
    @IsEmail()
    @IsNotEmpty()
    @AutoMap()
    email: string; 
    @ApiProperty({
        type: String
    })
    @IsAlphanumeric()
    @IsNotEmpty()
    @AutoMap()
    password: string;
}

export class LoginResponseDTO {
    @ApiProperty({
        type:String
    })
    message: string;
    @ApiProperty({
        type:String
    })
    token:string
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

    @AutoMap()
    role?: string;
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