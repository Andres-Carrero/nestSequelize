import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { workflowTypeAction } from 'src/models/model/workflowTypeAction';
import { PaginationOptionsInterface } from '../complements/interface/paginator.interface';

@Injectable()
export class WorkflowTypeActionService {
    constructor(
        @InjectModel(workflowTypeAction)
        private readonly Model: typeof workflowTypeAction,
    ){}

    async getAll(options: PaginationOptionsInterface): Promise<any>{
        const {count, rows} = await this.Model.findAndCountAll({
        limit: options.limits,
        offset: options.pages,
        });
 
      return {rows, count};
    }
          
    async findById(id):Promise<workflowTypeAction[]>{
        const findid = await this.Model.findOne({where: {unique_id: id}, })
        if (findid == null){return [id, 'no hay resultados']}

        return [findid]
    }
        

    async Create(data):Promise<workflowTypeAction>{
        const NewData = await this.Model.create(data);
        return NewData
    }
      
    
    async Update(id, data ):Promise<workflowTypeAction[]>{
        const update = await this.Model.update(data, {where: {unique_id: id}})
        return data
    }
    
        
    async delete(id, data):Promise<workflowTypeAction[]>{
        const eliminate = await this.Model.update(data, {where: {unique_id: id}})
        return data
    }
}

