import { Controller, Get, Post, Delete, Param, Request, Body, Put } from '@nestjs/common';
import { TypeSkills } from 'src/models/model/typeSkills';
import { typeSkillsDto } from '../complements/dto/typeSkills.dto';
import { TypeskillsService } from '../services/typeskills.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('skills')
export class TypeskillsController {
    constructor(private services: TypeskillsService){}


    @Get()
    async index(@Request() request){
        const datas = await this.services.getAll({
            limits: request.query.hasOwnProperty('limits') ? request.query.limits : 5,
            pages: request.query.hasOwnProperty('pages') ? request.query.pages : 0,
          });

      return datas
    }
    

    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<TypeSkills[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:typeSkillsDto):Promise<TypeSkills>{
        IndexDto.unique_id = uuidv4()
        return this.services.Create(IndexDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:typeSkillsDto):Promise<TypeSkills[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }


    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:typeSkillsDto):Promise<TypeSkills[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }

}
