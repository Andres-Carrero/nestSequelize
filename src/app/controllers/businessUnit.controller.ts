import { Controller, Get, Post, Put, Delete, Param, Body, Response, Request } from '@nestjs/common';
import { businessUnit } from 'src/models/model/businessUnit';
import { BusinessUnitDto } from '../complements/dto/businessUnit.dto';
import { BusinessUnitService } from '../services/businessunit.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('businessUnit')
export class BusinessUnitController{
    constructor(private services: BusinessUnitService){}


    @Get()
    async index(@Request() request){
        const datas = await this.services.getAll({
            limits: request.query.hasOwnProperty('limits') ? request.query.limits : 5,
            pages: request.query.hasOwnProperty('pages') ? request.query.pages : 0,
          });

      return datas
    }
    

    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<businessUnit[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:BusinessUnitDto):Promise<businessUnit>{
        IndexDto.unique_id =  uuidv4()
        return this.services.Create(IndexDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:BusinessUnitDto):Promise<businessUnit[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }


    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:BusinessUnitDto):Promise<businessUnit[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }


}
