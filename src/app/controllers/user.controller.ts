import { Controller, Get, Post, Put, Delete, Param, Body, Res, Request, ParseIntPipe, HttpStatus  } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { users } from "src/models/model/user";
import { UsersDto } from "src/app/complements/dto/user.dto";
import { UserService } from "src/app/services/user.service";


@Controller('users')
export class UserController {
    constructor(private services: UserService){}


    @Get()
    async index(@Request() request){
        const datas = await this.services.getAll({
            limits: request.query.hasOwnProperty('limits') ? request.query.limits : 5,
            pages: request.query.hasOwnProperty('pages') ? request.query.pages : 0,
          });

      return datas
    }


    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<users[]>{
        return this.services.uuidUser(id);
    }
  

    @Post()
    create(@Body() UserDto:UsersDto):Promise<users>{
        UserDto.unique_id = uuidv4() 
        return this.services.CreateUsers(UserDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() UserDto:UsersDto):Promise<users[]>{
        UserDto.updatedAt = new Date
        return this.services.UpdateUsers(id, UserDto)
    }

    
    @Delete(':id')
    Delete(@Param('id') id:number, @Body() UserDto:UsersDto):Promise<users[]>{
        UserDto.deleteAt = new Date
        UserDto.status = false
        return this.services.deleteUsers(id, UserDto)
    }

}
