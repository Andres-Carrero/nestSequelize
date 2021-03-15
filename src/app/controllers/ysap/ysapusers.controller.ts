import { Body, Controller, Get, Param, Post, Put, Headers } from '@nestjs/common';
import { YsapUserService } from 'src/app/services/ysap/ysapuser.service';
import { v4 as uuidv4 } from 'uuid';


import { usersYsap } from 'src/models/model/ysap/userYsap';
import { LoginYsapDto, UsersYsapDto } from "../../complements/dto/Ysap.dto";

@Controller('userYsap')
export class YsapUsersController {
    constructor(
        private services: YsapUserService,
        ){}



    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<usersYsap>{
        return this.services.uuidUser(id);
    }

  
    @Post('login')
    login(@Body() UserDto:LoginYsapDto):Promise<any>{ 
        return this.services.loginYsap(UserDto)
    }

    @Post()
    create(@Body() UserDto:UsersYsapDto):Promise<usersYsap>{
        UserDto.unique_id = uuidv4() 
        return this.services.CreateUsers(UserDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() UserDto:UsersYsapDto){
        const verifyToken = this.services.verifyTokenYsap(UserDto.token)
        
        UserDto.updatedAt = new Date
        return  this.services.UpdateUsers(id, UserDto)
    }

    @Post('data')
    createStatus():Promise<any>{
        return this.services.CreateStatus()
    }



}
