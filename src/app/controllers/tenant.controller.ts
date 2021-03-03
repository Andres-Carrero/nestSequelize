import { Controller, Get, Post, Put, Delete, Param, Body, Response, Request } from '@nestjs/common';
import { tenant } from 'src/models/model/tenant';
import { TennanDto } from '../complements/dto/tenant.dto';
import { TenantService } from '../services/tenant.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('tenant')
export class TenantController {
    constructor(private services: TenantService){}


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
    findByUuid(@Param('id') id:number):Promise<tenant[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:TennanDto):Promise<tenant>{
        IndexDto.unique_id = uuidv4() 
        return this.services.Create(IndexDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:TennanDto):Promise<tenant[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }


    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:TennanDto):Promise<tenant[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }

}
