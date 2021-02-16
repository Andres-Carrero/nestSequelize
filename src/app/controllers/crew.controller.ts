import { Controller, Get, Post, Param, Body, Request, Put, Delete } from '@nestjs/common';
import { Crew } from 'src/models/model/crew';
import { CrewService } from '../services/crew.service';
import { crewDto } from "src/app/complements/dto/crew.dto";
import { v4 as uuidv4 } from 'uuid';

@Controller('crew')
export class CrewController {
    constructor(private services: CrewService){}


    @Get()
    async index(@Request() request){
        const datas = await this.services.getAll({
            limits: request.query.hasOwnProperty('limits') ? request.query.limits : 5,
            pages: request.query.hasOwnProperty('pages') ? request.query.pages : 0,
          });

      return datas
    }
    

    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<Crew[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:crewDto):Promise<Crew>{
        IndexDto.unique_id = uuidv4()
        return this.services.Create(IndexDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:crewDto):Promise<Crew[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }


    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:crewDto):Promise<Crew[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }

}
