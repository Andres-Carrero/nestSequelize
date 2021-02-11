import { Injectable, NotFoundException,  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { roles } from "src/models/model/role";
//import { PaginationOptionsInterface, Pagination } from "src/app/complements/index.interface";

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(roles)
        private readonly Model: typeof roles,
    ){}
        
    /*async paginate(options: PaginationOptionsInterface,): Promise<Pagination<rolesRepository>> {
        const [results, total] = await this.Model.findAndCount({where: {state: true},
        take: options.limit,
        skip: options.page, 
        });
        
        return new Pagination<rolesRepository>({
        results,
        total,
        });
    }*/
      
    
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