import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request } from '@nestjs/common';
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
      console.log(userId);
      
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
    async index(@Request() request){
        const datas = await this.services.getAll({
            limits: request.query.hasOwnProperty('limits') ? request.query.limits : 5,
            pages: request.query.hasOwnProperty('pages') ? request.query.pages : 0,
            orden: request.query.hasOwnProperty('orden') ? request.query.orden : 'ASC',
            columns: request.query.columns,
            filter: request.query.filter

          });

      return datas
    }


    @Delete(':userId')
    async deleteAll(@Param('userId', ParseIntPipe) userId: number){
      return this.services.deleteAll(userId);
    }

 
}
