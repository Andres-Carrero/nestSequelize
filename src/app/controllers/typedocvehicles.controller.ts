import { Controller, Get, Post, Put, Delete, Request, Param, Body } from '@nestjs/common';
import { typeDocVehicles } from 'src/models/model/typeDocVehicles';
import { typeDocVehicleDto } from '../complements/dto/typeDocVehicles.dto';
import { TypedocvehiclesService } from '../services/typedocvehicles.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('typeDocVehicle')
export class TypedocvehiclesController {
    constructor(private services: TypedocvehiclesService){}


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
    findByUuid(@Param('id') id:number):Promise<typeDocVehicles[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:typeDocVehicleDto):Promise<typeDocVehicles>{
        IndexDto.unique_id = uuidv4()
        return this.services.Create(IndexDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:typeDocVehicleDto):Promise<typeDocVehicles[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }


    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:typeDocVehicleDto):Promise<typeDocVehicles[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }

}
