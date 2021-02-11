import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { businessUnit } from 'src/models/model/businessUnit';

@Injectable()
export class BusinessUnitService {
    constructor(
        @InjectModel(businessUnit)
        private readonly Model: typeof businessUnit,
    ){}


    /*async paginate(options: PaginationOptionsInterface,): Promise<Pagination<businessUnitRepository>> {
        const [results, total] = await this.Model.findAndCount({where: {state: true},
            take: options.limit,
            skip: options.page, 
        });
        
        return new Pagination<businessUnitRepository>({
            results,
            total,
        });
    }*/


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
