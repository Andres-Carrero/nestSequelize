import { Injectable, NotFoundException,  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as buildPaginator from 'pagination-apis';
import { FilterWithPagination, PaginationOptionsInterface } from "src/app/complements/interface/paginator.interface";
import { permission } from 'src/models/model/permission';

import { roles } from "src/models/model/role";
import { users } from 'src/models/model/user';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(roles)
        private readonly Model: typeof roles,
    ){}
        
    async getAll(options: PaginationOptionsInterface): Promise<FilterWithPagination>{
        const { page, limit, skip, paginate } = buildPaginator({limit: options.limits, page: options.pages});
        const {count, rows} = await this.Model.findAndCountAll({
        limit,
        offset: skip,
        where: {status: true},
        //@ts-ignore
        include: [users, permission]
        });
 
      return paginate(rows, count);
      }
      
    
    async findById(id):Promise<roles[]>{
        const findid = await this.Model.findOne({where: {id}})
        if (findid == null){return [id, 'no hay resultados']}

        return [findid]
    }
        

    async Create(data):Promise<roles>{
        const NewData = await this.Model.create(data);
        return NewData
    }
    
    
    async Update(id, data ):Promise<roles[]>{
        const update = await this.Model.update(data, {where: {id}})
        return data
    }
    
    
    async delete(id, data):Promise<roles[]>{
        const eliminate = await this.Model.update(data, {where: {id}})
        return [id, data]
    }
   
      

              
}