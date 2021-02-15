import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contract } from 'src/models/model/contract';
import { Process } from "src/models/model/process";
import { PaginationOptionsInterface } from '../complements/interface/paginator.interface';

@Injectable()
export class ProcessService {
    constructor(
        @InjectModel(Process)
        private readonly Model: typeof Process,
    ){}

    async getAll(options: PaginationOptionsInterface): Promise<any>{
        const {count, rows} = await this.Model.findAndCountAll({
        limit: options.limits,
        offset: options.pages,
        //@ts-ignore
        include: [Contract]
        });
 
      return {rows, count};
    }
          
    async findById(id):Promise<Process[]>{
        //@ts-ignore
        const findid = await this.Model.findOne({where: {unique_id: id}, include: [Contract]})
        if (findid == null){return [id, 'no hay resultados']}

        return [findid]
    }
        

    async Create(data):Promise<Process>{
        const NewData = await this.Model.create(data);
        return NewData
    }
      
    
    async Update(id, data ):Promise<Process[]>{
        const update = await this.Model.update(data, {where: {unique_id: id}})
        return data
    }
    
        
    async delete(id, data):Promise<Process[]>{
        const eliminate = await this.Model.update(data, {where: {unique_id: id}})
        return [id, data]
    }
}

