import { Controller, Get, Param, Body, Post, Delete, Put, Request } from '@nestjs/common';
import { Departments } from 'src/models/model/departments';
import { departmentsDto } from '../complements/dto/departments.dto';
import { DepartmentService } from '../services/department.service';
import { v4 as uuidv4 } from 'uuid';


@Controller('department')
export class DepartmentController {
    constructor(private services: DepartmentService){}


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
    findByUuid(@Param('id') id:number):Promise<Departments[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:departmentsDto):Promise<Departments>{
        IndexDto.unique_id = uuidv4()
        return this.services.Create(IndexDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:departmentsDto):Promise<Departments[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }


    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:departmentsDto):Promise<Departments[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }

}
