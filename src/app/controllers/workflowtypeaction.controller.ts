import { Controller, Get, Post, Put, Delete, Param, Request,Body } from '@nestjs/common';
import { workflowTypeAction } from 'src/models/model/workflowTypeAction';
import { workflowTypeActionDto } from '../complements/dto/workflow.dto';
import { WorkflowTypeActionService } from '../services/workflowtypeaction.service';
import { v4 as uuidv4 } from 'uuid';


@Controller('WorkflowTypeAction')
export class WorkflowTypeActionController {
    constructor(private services: WorkflowTypeActionService){}


    @Get()
    async index(@Request() request){
        const datas = await this.services.getAll({
            limits: request.query.hasOwnProperty('limits') ? request.query.limits : 5,
            pages: request.query.hasOwnProperty('pages') ? request.query.pages : 0,
          });

      return datas
    }
    

    @Get(':id')
    findByUuid(@Param('id') id:number):Promise<workflowTypeAction[]>{
        return this.services.findById(id);
    }
  

    @Post()
    create(@Body() IndexDto:workflowTypeActionDto):Promise<workflowTypeAction>{
        IndexDto.unique_id = uuidv4()
        return this.services.Create(IndexDto)
    }


    @Put(':id')
    Update(@Param('id') id:number, @Body() IndexDto:workflowTypeActionDto):Promise<workflowTypeAction[]>{
        IndexDto.updatedAt = new Date
        return this.services.Update(id, IndexDto)
    }


    @Delete(':id')
    Delete(@Param('id') id:number, @Body() IndexDto:workflowTypeActionDto):Promise<workflowTypeAction[]>{
        IndexDto.status = false
        IndexDto.deleteAt = new Date
        return this.services.delete(id, IndexDto)
    }

}
