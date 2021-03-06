import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { permission } from 'src/models/model/permission';
import * as buildPaginator from 'pagination-apis';
import { FilterWithPagination, PaginationOptionsInterface } from "src/app/complements/interface/paginator.interface";
import { roles } from 'src/models/model/role';

@Injectable()
export class PermissionService {
    constructor(
        @InjectModel(permission)
        private readonly Model: typeof permission,
    ){}

    async getAll(options: PaginationOptionsInterface): Promise<FilterWithPagination>{
        const { page, limit, skip, paginate } = buildPaginator({limit: options.limits, page: options.pages});
        const {count, rows} = await this.Model.findAndCountAll({
        limit,
        offset: skip,
        where: {status: true},
        //@ts-ignore
        include: [roles]
        });
 
      return paginate(rows, count);
      }

          
    async findById(id):Promise<permission[]>{
        //@ts-ignore
        const findid = await this.Model.findOne({where: {unique_id: id}, include: [roles]})
        if (findid == null){return [id, 'no hay resultados']}

        return [findid]
    }
        

    async Create(data):Promise<permission>{
        const NewData = await this.Model.create(data);
        return NewData
    }
      
    
    async Update(id, data ):Promise<permission[]>{
        const update = await this.Model.update(data, {where: {unique_id: id}})
        return data
    }
    
        
    async delete(id, data):Promise<permission[]>{
        const eliminate = await this.Model.update(data, {where: {unique_id: id}})
        return [id, data]
    }
}
