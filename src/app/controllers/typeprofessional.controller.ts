import { Controller, Get, Post, Param, Body, Put, Delete, Request } from '@nestjs/common';
import { TypeProfessional } from 'src/models/model/typeProfessional';
import { typeProfessionalDto } from '../complements/dto/typeProfessional.dto';
import { TypeProfessionalService } from '../services/typeprofessional.service';
import { v4 as uuidv4 } from 'uuid';


@Controller('typeProfessional')
export class TypeProfessionalController {
    constructor(private services: TypeProfessionalService){}


    @Get()
    async index(@Request() request){
        const datas = await this.services.getAll({
            limits: request.query.hasOwnProperty('limits') ? request.query.limits : 5,
            pages: request.query.hasOwnProperty('pages') ? request.query.pages : 0,
          });

      return datas
    }
    

    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<TypeProfessional[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:typeProfessionalDto):Promise<TypeProfessional>{
        IndexDto.unique_id = uuidv4()
        return this.services.Create(IndexDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:typeProfessionalDto):Promise<TypeProfessional[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }


    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:typeProfessionalDto):Promise<TypeProfessional[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }

}
