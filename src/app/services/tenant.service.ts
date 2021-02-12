import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { tenant } from 'src/models/model/tenant';
import * as buildPaginator from 'pagination-apis';
import { FilterWithPagination, PaginationOptionsInterface } from "src/app/complements/interface/paginator.interface";

@Injectable()
export class TenantService {
    constructor(
        @InjectModel(tenant)
        private readonly Model: typeof tenant,
    ){}


    async getAll(options: PaginationOptionsInterface): Promise<FilterWithPagination>{
        const { page, limit, skip, paginate } = buildPaginator({limit: options.limits, page: options.pages});
        const {count, rows} = await this.Model.findAndCountAll({
        limit,
        offset: skip,
        where: {status: true},
        });
 
      return paginate(rows, count);
      }
    

    async findById(id):Promise<tenant[]>{
        const findid = await this.Model.findOne({where: {id}})
        if (findid == null){return [id, 'no hay resultados']}

        return [findid]
    }
        

    async Create(data):Promise<tenant>{
        const NewData = await this.Model.create(data);

        return NewData
    }
        

    async Update(id, data ):Promise<tenant[]>{
        const update = await this.Model.update(data, {where: {id}})
        return data
    }
       
    
    async delete(id, data):Promise<tenant[]>{
        const eliminate = await this.Model.update(data, {where: {id}})
        return [id, data]
    }

    
}

