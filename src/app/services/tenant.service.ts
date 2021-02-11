import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { tenant } from 'src/models/model/tenant';

@Injectable()
export class TenantService {
    constructor(
        @InjectModel(tenant)
        private readonly Model: typeof tenant,
    ){}


    /*async paginate(options: PaginationOptionsInterface,): Promise<Pagination<tenant>> {
        const [results, total] = await this.Model.findAndCount({where: {state: true},
            take: options.limit,
            skip: options.page, 
        });
        
        return new Pagination<tennanRepository>({
            results,
            total,
        });
    }*/


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

