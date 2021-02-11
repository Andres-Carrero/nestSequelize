import { Controller, Get, Post, Put, Delete, Param, Body, Res, Request, ParseIntPipe } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { users } from "src/models/model/user";
import { UsersDto, userRoleDto } from "src/app/complements/dto/user.dto";
import { UserService } from "src/app/services/user.service";
//import { Pagination } from "src/app/complements/index.interface";


@Controller('users')
export class UserController {
    constructor(private services: UserService){}


    /*@Get()
    async index(@Request() request): Promise<Pagination<users>> {
      return await this.services.paginate({
        limit: request.query.hasOwnProperty('limit') ? request.query.limit : 5,
        page: request.query.hasOwnProperty('page') ? request.query.page : 0,
      });
    }*/


    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<users[]>{
        return this.services.uuidUser(id);
    }
  

    @Post()
    create(@Body() UserDto:UsersDto):Promise<users>{
        UserDto.unique_id = 'User:' + uuidv4() 
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
