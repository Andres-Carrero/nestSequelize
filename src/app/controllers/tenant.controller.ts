import { Controller, Get, Post, Put, Delete, Param, Body, Response, Request } from '@nestjs/common';
import { tenant } from 'src/models/model/tenant';
import { TennanDto } from '../complements/dto/tenant.dto';
import { TenantService } from '../services/tenant.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('tenant')
export class TenantController {
    constructor(private services: TenantService){}


    /*@Get()
    async index(@Request() request): Promise<Pagination<tennanRepository>> {
      return await this.services.paginate({
        limit: request.query.hasOwnProperty('limit') ? request.query.limit : 2,
        page: request.query.hasOwnProperty('page') ? request.query.page : 0,
      });
    }*/


    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<tenant[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:TennanDto):Promise<tenant>{
        IndexDto.unique_id = 'Tenant:' + uuidv4() 
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
