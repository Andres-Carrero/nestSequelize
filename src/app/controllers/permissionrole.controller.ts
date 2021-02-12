import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { permissionRole } from 'src/models/model/relations/permissionRole';
import { PermissionRoleService } from '../services/permissionrole.service';

@Controller('permissionRole')
export class PermissionRoleController {
    constructor(private services: PermissionRoleService){}


    @Post(':permissionId/:roleId')
    async Create(
      @Param('permissionId', ParseIntPipe) permissionId: number,
      @Param('roleId', ParseIntPipe) roleId: number,
    ){    
      return this.services.Create(permissionId, roleId);
    }


    @Get(':permissionId')
    findByUuid(@Param('userId') permissionId:number){
        return this.services.findOne(permissionId);
    }

    
    @Put(':permissionId/:roleId')
    async Update(
      @Param('permissionId', ParseIntPipe) permissionId: number,
      @Param('roleId', ParseIntPipe) roleId: number,
    ){ 
      return this.services.update(permissionId, roleId);
    }


    @Get()
    async findAll():Promise<permissionRole[]>{
      return this.services.findAll();
    }


    @Delete(':permissionId')
    async deleteAll(@Param('permissionId', ParseIntPipe) permissionId: number){
      return this.services.deleteAll(permissionId);
    }
}
