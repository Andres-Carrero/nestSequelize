import { Controller, Get, Post, Put, Delete, Param, Body, Res, Request } from '@nestjs/common';
import { RoleDto } from "src/app/complements/dto/role.dto";
import { RoleService } from "src/app/services/role.service";
//import { Pagination } from "src/app/complements/index.interface";
import { roles } from 'src/models/model/role';
import { v4 as uuidv4 } from 'uuid';

@Controller('roles')
export class RoleController {
    constructor(private services: RoleService){}


    /*@Get()
    async index(@Request() request): Promise<Pagination<rolesRepository>> {
      return await this.services.paginate({
        limit: request.query.hasOwnProperty('limit') ? request.query.limit : 5,
        page: request.query.hasOwnProperty('page') ? request.query.page : 0,
      });
    }*/

    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<roles[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:RoleDto):Promise<roles>{
        IndexDto.unique_id = 'Role:' + uuidv4()
        return this.services.Create(IndexDto)
    }

    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:RoleDto):Promise<roles[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }

    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:RoleDto):Promise<roles[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }
}
