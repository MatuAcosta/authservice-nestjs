import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { CreateUserDTO } from 'src/dtos/user.dto';
import { AuthService } from 'src/modules/auth/service/auth.service';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService, private authService:AuthService){}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll(@Req() userinfo: Request, @Res() res: Response ){
        let users = await this.userService.findAll();
        return res.status(200).json({
            users
        })
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        console.log();
        return this.userService.findOne(id);
    }


    @Post('/register')
    async register(@Body() user:CreateUserDTO, @Res() res:Response ){
        let checkExists = await this.authService.checkRegister(user.email);
        if(checkExists) throw new BadRequestException('Email already exists');
        let userCreated = await this.userService.create(user);
        if(userCreated) return res.status(201).json(
            {
                message: 'User succesfully created',
                data: userCreated
            });

    }

    //flow --> localregister: super --> validate --> controller --> Auth.service: login() --> controller
    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Req() req: any, @Res() res:Response){
        console.log("REQ: ",req.user);
        let token = await this.authService.login(req.user);
        console.log(token);
        return res.status(200).json({
            message: 'User authenticated',
            token
        })
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Body() user,  @Param('id',ParseIntPipe) id: number){
        return this.userService.update(id,user);
    }

    

}
