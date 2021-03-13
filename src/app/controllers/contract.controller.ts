import { Controller, Delete, Get, Param, Post, Put, Body, Request } from '@nestjs/common';
import { Contract } from 'src/models/model/contract';
import { contractDto } from '../complements/dto/contract.dto';
import { v4 as uuidv4 } from 'uuid';
import { ContractService } from '../services/contract.service';

@Controller('contract')
export class ContractController {
    constructor(private services: ContractService){}


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
    findByUuid(@Param('id') id:number):Promise<Contract[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:contractDto):Promise<Contract>{
        IndexDto.unique_id = uuidv4()
        return this.services.Create(IndexDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:contractDto):Promise<Contract[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }


    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:contractDto):Promise<Contract[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }

}
