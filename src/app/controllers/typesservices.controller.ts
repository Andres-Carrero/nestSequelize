import { Controller, Get, Request, Body, Delete, Put, Param, Post } from '@nestjs/common';
import { typeServices } from 'src/models/model/typesServices';
import { typeServicesDto } from '../complements/dto/typeServices.dto';
import { TypesServicesService } from '../services/typesservices.service';
import { v4 as uuidv4 } from 'uuid';


@Controller('typeService')
export class TypesServicesController {
    constructor(private services: TypesServicesService){}


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
    findByUuid(@Param('id') id:number):Promise<typeServices[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:typeServicesDto):Promise<typeServices>{
        IndexDto.unique_id = uuidv4()
        return this.services.Create(IndexDto)
    }

    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:typeServicesDto):Promise<typeServices[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }

    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:typeServicesDto):Promise<typeServices[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }
}
