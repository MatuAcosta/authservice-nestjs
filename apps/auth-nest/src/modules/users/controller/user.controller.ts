import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe,Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { Request } from 'express';
import { CreateUserDTO, LoginDTO, LoginResponseDTO, UpdateUserDTO } from '../../../dtos/user.dto';
import { AuthService } from '../../auth/service/auth.service';
import { MailService } from '../../mailsender/mail/mail.service';
import { UserService } from '../services/user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private userService: UserService, private authService:AuthService, private mailService: MailService){}

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Get()
    async findAll(@Req() userinfo: Request){
        console.log(userinfo.headers)
        let users = await this.userService.findAll();
        return {
            users
        }
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        let user = await this.userService.findOne(id);
        if (!user) return { message: 'user not found'}
        return {
            user
        }
    }


    @Post('/register')
    @ApiResponse({status:201, type: CreateUserDTO})
    async register(@Body() user:CreateUserDTO){
        console.log(user);
        let checkExists = await this.authService.checkRegister(user.email);
        if(checkExists) throw new BadRequestException('Email already exists');
        let userCreated = await this.userService.create(user);
        if(userCreated) return {
            message: 'User succesfully created',
            data: userCreated,
            statusCode: 201
        }

    }

    //flow --> localregister: super --> validate --> controller --> Auth.service: login() --> controller
    @UseGuards(AuthGuard('local'))
    @ApiResponse({ status: 200, type: LoginResponseDTO})
    @Post('/login')
    async login(@Body() login: LoginDTO){
        let token = await this.authService.login(login);
        console.log(token);
        return {
            message: 'User authenticated',
            token,
            statusCode: 200
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Body() user: UpdateUserDTO,  @Param('id',ParseIntPipe) id: number){
        return this.userService.update(id,user);
    }

    

}

