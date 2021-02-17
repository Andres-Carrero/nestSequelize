import { Controller, ParseIntPipe, Param, Body, Post, Put, Get, Delete, Request } from '@nestjs/common';
import { docVehiclesDto } from '../complements/dto/relations.dto';
import { DocvehicleService } from '../services/docvehicle.service';

@Controller('docVehicles')
export class DocvehicleController {
    constructor(private services: DocvehicleService){}


    @Post(':vehicleId/:TypeDocId')
    async Create(
      @Param('vehicleId', ParseIntPipe) vehicleId: number,
      @Param('TypeDocId', ParseIntPipe) TypeDocId: number,
      @Body() data: docVehiclesDto
    ){    
      return this.services.Create(vehicleId, TypeDocId, data);
    }


    @Get(':vehicleId')
    findByUuid(@Param('vehicleId') vehicleId:number){
 
      
        return this.services.findOne(vehicleId);
    }

    
    @Put(':vehicleId/:TypeDocId')
    async Update(
      @Param('vehicleId', ParseIntPipe) vehicleId: number,
      @Param('TypeDocId', ParseIntPipe) TypeDocId: number,
      @Body() data: docVehiclesDto
    ){ 
      return this.services.update(vehicleId, TypeDocId, data);
    }


    @Get()
    async index(@Request() request){
        const datas = await this.services.getAll({
            limits: request.query.hasOwnProperty('limits') ? request.query.limits : 5,
            pages: request.query.hasOwnProperty('pages') ? request.query.pages : 0,
          });

      return datas
    }


    @Delete(':vehicleId')
    async deleteAll(@Param('vehicleId', ParseIntPipe) vehicleId: number){
      return this.services.deleteAll(vehicleId);
    }

 
}
