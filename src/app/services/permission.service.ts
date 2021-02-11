import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { permission } from 'src/models/model/permission';

@Injectable()
export class PermissionService {
    constructor(
        @InjectModel(permission)
        private readonly Model: typeof permission,
    ){}

    /*async paginate(options: PaginationOptionsInterface,): Promise<Pagination<permissionsRepository>> {
        const [results, total] = await this.Model.findAndCount({where: {state: true},
            take: options.limit,
            skip: options.page, 
        });
        
        return new Pagination<permissionsRepository>({
            results,
            total,
        });
    }*/

          
    async findById(id):Promise<permission[]>{
        const findid = await this.Model.findOne({where: {id}})
        if (findid == null){return [id, 'no hay resultados']}

        return [findid]
    }
        

    async Create(data):Promise<permission>{
        const NewData = await this.Model.create(data);
        return NewData
    }
      
    
    async Update(id, data ):Promise<permission[]>{
        const update = await this.Model.update(data, {where: {id}})
        return data
    }
    
        
    async delete(id, data):Promise<permission[]>{
        const eliminate = await this.Model.update(data, {where: {id}})
        return [id, data]
    }
}
