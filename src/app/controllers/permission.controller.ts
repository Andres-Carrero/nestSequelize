import { Controller, Get, Post, Put, Delete, Param, Body, Res, Request } from '@nestjs/common';
import { permission } from 'src/models/model/permission';
import { PermissionsDto } from '../complements/dto/permissionRole.dto';
import { PermissionService } from '../services/permission.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('permission')
export class PermissionController {
    constructor(private services: PermissionService){}


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
    

    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<permission[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:PermissionsDto):Promise<permission>{
        IndexDto.unique_id = uuidv4()
        return this.services.Create(IndexDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:PermissionsDto):Promise<permission[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }


    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:PermissionsDto):Promise<permission[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }

}
