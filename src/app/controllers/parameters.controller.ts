import { Controller, Get, Request, Body, Param, Put, Post, Delete } from '@nestjs/common';
import { Parameters } from 'src/models/model/Parameters';
import { parameterDto } from '../complements/dto/parameters.dto';
import { ParametersService } from '../services/parameters.service';
import { v4 as uuidv4 } from 'uuid';


@Controller('parameters')
export class ParametersController {
    constructor(private services: ParametersService){}


    @Get()
    async index(@Request() request){
        const datas = await this.services.getAll({
            limits: request.query.hasOwnProperty('limits') ? request.query.limits : 5,
            pages: request.query.hasOwnProperty('pages') ? request.query.pages : 0,
          });

      return datas
    }
    

    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<Parameters[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:parameterDto):Promise<Parameters>{
        IndexDto.unique_id = uuidv4()
        return this.services.Create(IndexDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:parameterDto):Promise<Parameters[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }


    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:parameterDto):Promise<Parameters[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }

}
