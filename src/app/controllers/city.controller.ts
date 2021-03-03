import { Controller, Get, Post, Delete, Put, Request, Param, Body } from '@nestjs/common';
import { CityService } from '../services/city.service';
import { v4 as uuidv4 } from 'uuid';
import { City } from 'src/models/model/city';
import { cityDto } from '../complements/dto/city.dto';

@Controller('city')
export class CityController {
    constructor(private services: CityService){}


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
    findByUuid(@Param('id') id:number):Promise<City[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:cityDto):Promise<City>{
        IndexDto.unique_id = uuidv4()
        return this.services.Create(IndexDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:cityDto):Promise<City[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }


    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:cityDto):Promise<City[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }

}
