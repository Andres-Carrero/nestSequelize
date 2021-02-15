import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { configUsers } from 'src/models/model/configUser';
import * as buildPaginator from 'pagination-apis';
import { FilterWithPagination, PaginationOptionsInterface } from "src/app/complements/interface/paginator.interface";

@Injectable()
export class ConfigUserService {
    constructor(
        @InjectModel(configUsers)
        private readonly Model: typeof configUsers,
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


    async findById(id):Promise<configUsers[]>{
        const findid = await this.Model.findOne({where: {unique_id: id}})
        if (findid == null){return [id, 'no hay resultados']}

        return [findid]
    }
    
    
    async Create(data):Promise<configUsers>{
        const NewData = await this.Model.create(data);
        return NewData
    }
    
    
    async Update(id, data ):Promise<configUsers[]>{
        const update = await this.Model.update(data, {where: {unique_id: id}})
        return data
    }
    
    
    async delete(id, data):Promise<configUsers[]>{
        const eliminate = await this.Model.update(data, {where: {unique_id: id}})
        return [id, data]
    }

 
}


