import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Parameters } from 'src/models/model/Parameters';
import { PaginationOptionsInterface } from '../complements/interface/paginator.interface';
import { businessUnit } from "src/models/model/businessUnit";
import { roles } from 'src/models/model/role';

@Injectable()
export class ParametersService {
    constructor(
        @InjectModel(Parameters)
        private readonly Model: typeof Parameters,
    ){}

    async getAll(options: PaginationOptionsInterface): Promise<any>{
        const {count, rows} = await this.Model.findAndCountAll({
        limit: options.limits,
        offset: options.pages,
        //@ts-ignore
        include: [{model: businessUnit, include: [roles]}   ],
        });
 
      return {rows, count};
    }
          
    async findById(id):Promise<Parameters[]>{
        //@ts-ignore
        const findid = await this.Model.findOne({where: {unique_id: id}, include: [{model: businessUnit, include: [roles]}] })
        if (findid == null){return [id, 'no hay resultados']}

        return [findid]
    }
        

    async Create(data):Promise<Parameters>{
        const NewData = await this.Model.create(data);
        return NewData
    }
      
    
    async Update(id, data ):Promise<Parameters[]>{
        const update = await this.Model.update(data, {where: {unique_id: id}})
        return data
    }
    
        
    async delete(id, data):Promise<Parameters[]>{
        const eliminate = await this.Model.update(data, {where: {unique_id: id}})
        return [id, data]
    }
}

