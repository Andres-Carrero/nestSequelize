import { Controller, Delete, Get, Post, Put, Request, Param, Body } from '@nestjs/common';
import { Process } from 'src/models/model/process';
import { v4 as uuidv4 } from 'uuid';
import { processDto } from '../complements/dto/process.dto';
import { ProcessService } from '../services/process.service';


@Controller('process')
export class ProcessController {
    constructor(private services: ProcessService){}


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
    findByUuid(@Param('id') id:number):Promise<Process[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:processDto):Promise<Process>{
        IndexDto.unique_id = uuidv4()
        return this.services.Create(IndexDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:processDto):Promise<Process[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }


    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:processDto):Promise<Process[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }

}
