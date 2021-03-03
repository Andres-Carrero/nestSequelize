import { Controller, Get, Request, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { Country } from 'src/models/model/country';
import { contryDto } from '../complements/dto/country.dto';
import { CountryService } from '../services/country.service';
import { v4 as uuidv4 } from 'uuid';


@Controller('country')
export class CountryController {
    constructor(private services: CountryService){}


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
    findByUuid(@Param('id') id:number):Promise<Country[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:contryDto):Promise<Country>{
        IndexDto.unique_id = uuidv4()
        return this.services.Create(IndexDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:contryDto):Promise<Country[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }


    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:contryDto):Promise<Country[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }

}
