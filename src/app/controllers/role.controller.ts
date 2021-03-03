import { Controller, Get, Post, Put, Delete, Param, Body, Res, Request } from '@nestjs/common';
import { RoleDto } from "src/app/complements/dto/role.dto";
import { RoleService } from "src/app/services/role.service";
//import { Pagination } from "src/app/complements/index.interface";
import { roles } from 'src/models/model/role';
import { v4 as uuidv4 } from 'uuid';

@Controller('roles')
export class RoleController {
    constructor(private services: RoleService){}


    @Get()
    async index(@Request() request){
        const datas = await this.services.getAll({
            limits: request.query.hasOwnProperty('limits') ? request.query.limits : 5,
            pages: request.query.hasOwnProperty('pages') ? request.query.pages : 0,
            orden: request.query.hasOwnProperty('orden') ? request.query.orden : 'ASC',

          });

      return datas
    }

    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<roles[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:RoleDto):Promise<roles>{
        IndexDto.unique_id = uuidv4()
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
