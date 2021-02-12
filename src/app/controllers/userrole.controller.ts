import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { users } from 'src/models/model/user';
import { UsersDto } from '../complements/dto/user.dto';
import { UserRoleService } from '../services/userRole.service';
import { userRole } from 'src/models/model/relations/userRole';

@Controller('usersRoles')
export class UserRoleController {
    constructor(private services: UserRoleService){}


    @Post(':userId/:roleId')
    async Create(
      @Param('userId', ParseIntPipe) userId: number,
      @Param('roleId', ParseIntPipe) roleId: number,
    ){    
      return this.services.Create(userId, roleId);
    }


    @Get(':userId')
    findByUuid(@Param('userId') userId:number){
        return this.services.findOne(userId);
    }

    
    @Put(':userId/:roleId')
    async Update(
      @Param('userId', ParseIntPipe) userId: number,
      @Param('roleId', ParseIntPipe) roleId: number,
    ){ 
      return this.services.update(userId, roleId);
    }


    @Get()
    async findAll():Promise<userRole[]>{
      return this.services.findAll();
    }


    @Delete(':userId')
    async deleteAll(@Param('userId', ParseIntPipe) userId: number){
      return this.services.deleteAll(userId);
    }

 
}
