import { Controller, Get, Post, Put, Delete, Request, Body, Param } from '@nestjs/common';
import { professionals } from 'src/models/model/professionals';
import { professionalDto } from '../complements/dto/professional.dto';
import { ProfessionalService } from '../services/professional.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('professional')
export class ProfessionalController {
    constructor(private services: ProfessionalService){}


    @Get()
    async index(@Request() request){
        const datas = await this.services.getAll({
            limits: request.query.hasOwnProperty('limits') ? request.query.limits : 5,
            pages: request.query.hasOwnProperty('pages') ? request.query.pages : 0,
          });

      return datas
    }
    

    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<professionals[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:professionalDto):Promise<professionals>{
        IndexDto.unique_id = uuidv4()
        return this.services.Create(IndexDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:professionalDto):Promise<professionals[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }


    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:professionalDto):Promise<professionals[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }

}
