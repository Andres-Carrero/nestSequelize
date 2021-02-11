import { Controller, Get, Post, Put, Delete, Param, Body, Res, Request } from '@nestjs/common';
import { permission } from 'src/models/model/permission';
import { PermissionsDto } from '../complements/dto/permissionRole.dto';
import { PermissionService } from '../services/permission.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('permission')
export class PermissionController {
    constructor(private services: PermissionService){}


    /*@Get()
    async index(@Request() request): Promise<Pagination<permissionsRepository>> {
      return await this.services.paginate({
        limit: request.query.hasOwnProperty('limit') ? request.query.limit : 2,
        page: request.query.hasOwnProperty('page') ? request.query.page : 0,
      });
    }*/
    

    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<permission[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:PermissionsDto):Promise<permission>{
        IndexDto.unique_id = 'Role:' + uuidv4()
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
