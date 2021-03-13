import { Controller, Get, Post, Request, Put, Delete, Body, Param } from '@nestjs/common';
import { Vehicles } from 'src/models/model/vehicles';
import { vehicleDto } from '../complements/dto/vehicle.dto';
import { VehiclesService } from '../services/vehicles.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('vehicles')
export class VehiclesController {
    constructor(private services: VehiclesService){}


    @Get()
    async index(@Request() request){
        const datas = await this.services.getAll({
            limits: request.query.hasOwnProperty('limits') ? request.query.limits : 5,
            pages: request.query.hasOwnProperty('pages') ? request.query.pages : 0,
            orden: request.query.hasOwnProperty('orden') ? request.query.orden : 'ASC',
            columns: request.query.columns,
            filter: request.query.filter
          });

      return datas
    }
    

    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<Vehicles[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:vehicleDto):Promise<Vehicles>{
        IndexDto.unique_id = uuidv4()
        return this.services.Create(IndexDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:vehicleDto):Promise<Vehicles[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }


    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:vehicleDto):Promise<Vehicles[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }

}
