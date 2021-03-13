import { Controller, Request, Get, Post, Put, Delete, Param, Body} from '@nestjs/common';
import { typeIdentificationDocument } from 'src/models/model/typeDocIdentification';
import { typeIdentiDocumentDto } from '../complements/dto/typeIdentiDoc.dto';
import { TypeIdentificationDocService } from '../services/typeidentificationdoc.service';
import { v4 as uuidv4 } from 'uuid';


@Controller('typeDocs')
export class TypeIdentificationDocController {
    constructor(private services: TypeIdentificationDocService){}


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
    findByUuid(@Param('id') id:number):Promise<typeIdentificationDocument[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:typeIdentiDocumentDto):Promise<typeIdentificationDocument>{
        IndexDto.unique_id =  uuidv4()
        return this.services.Create(IndexDto)
    }

    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:typeIdentiDocumentDto):Promise<typeIdentificationDocument[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }

    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:typeIdentiDocumentDto):Promise<typeIdentificationDocument[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }
}
