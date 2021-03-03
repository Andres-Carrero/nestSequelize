import { Controller, Get, Post, Put, Delete, Body, Param, Request } from '@nestjs/common';
import { Upz } from 'src/models/model/upz';
import { upzDto } from '../complements/dto/upz.dto';
import { UpzService } from '../services/upz.service';
import { v4 as uuidv4 } from 'uuid';


@Controller('upz')
export class UpzController {
    constructor(private services: UpzService){}


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
    findByUuid(@Param('id') id:number):Promise<Upz[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:upzDto):Promise<Upz>{
        IndexDto.unique_id = uuidv4()
        return this.services.Create(IndexDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:upzDto):Promise<Upz[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }


    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:upzDto):Promise<Upz[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }

}
