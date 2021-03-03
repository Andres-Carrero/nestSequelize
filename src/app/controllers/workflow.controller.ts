import { Controller, Get, Post, Put, Delete, Param, Request,Body } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { workflowDto } from '../complements/dto/workflow.dto';
import { WorkflowService } from '../services/workflow.service';

@Controller('Workflow')
export class WorkflowController {
    constructor(private services: WorkflowService){}


    @Post()
    create(@Body() IndexDto:workflowDto){   
        return this.services.Create(IndexDto)
    }

    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:workflowDto){
        
        return this.services.Update(id, IndexDto)
    }

    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<any>{
        return this.services.findById(id);
    }

    @Get()
    async index(@Request() request){
        const datas = await this.services.getAll({
            limits: request.query.hasOwnProperty('limits') ? request.query.limits : 5,
            pages: request.query.hasOwnProperty('pages') ? request.query.pages : 0,
            orden: request.query.hasOwnProperty('orden') ? request.query.orden : 'ASC',

          });

      return datas
    }


    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:workflowDto){
        return this.services.delete(id, IndexDto)
    }



}