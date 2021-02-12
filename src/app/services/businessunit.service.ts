import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { businessUnit } from 'src/models/model/businessUnit';
import * as buildPaginator from 'pagination-apis';
import { FilterWithPagination, PaginationOptionsInterface } from "src/app/complements/interface/paginator.interface";

@Injectable()
export class BusinessUnitService {
    constructor(
        @InjectModel(businessUnit)
        private readonly Model: typeof businessUnit,
    ){}


    async getAll(options: PaginationOptionsInterface): Promise<FilterWithPagination>{
        const { page, limit, skip, paginate } = buildPaginator({limit: options.limits, page: options.pages});
        const {count, rows} = await this.Model.findAndCountAll({
        limit,
        offset: skip,
        });
 
      return paginate(rows, count);
      }


    async findById(id):Promise<businessUnit[]>{
        const findid = await this.Model.findOne({where: {id}})
        if (findid == null){  return [id, 'no hay resultados']  }

        return [findid]
    }
   
    
    async Create(data):Promise<businessUnit>{
        const NewData = await this.Model.create(data);
        return NewData
    }
       
    
    async Update(id, data ):Promise<businessUnit[]>{
        const update = await this.Model.update(data, {where: {id}})
        return data
    }
        

    async delete(id, data):Promise<businessUnit[]>{
        const eliminate = await this.Model.update(data, {where: {id}})
        return [id, data]
    }

    
}
