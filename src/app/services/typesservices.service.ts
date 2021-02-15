import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { businessUnit } from 'src/models/model/businessUnit';
import { typeServices } from 'src/models/model/typesServices';
import { PaginationOptionsInterface } from '../complements/interface/paginator.interface';

@Injectable()
export class TypesServicesService {
    constructor(
        @InjectModel(typeServices)
        private readonly Model: typeof typeServices,
    ){}

    async getAll(options: PaginationOptionsInterface): Promise<any>{
        const {count, rows} = await this.Model.findAndCountAll({
        limit: options.limits,
        offset: options.pages,
        //@ts-ignore
        include: [businessUnit]
        });
 
      return {rows, count};
    }
          
    async findById(id):Promise<typeServices[]>{
        //@ts-ignore
        const findid = await this.Model.findOne({where: {unique_id: id}, include: [businessUnit]})
        if (findid == null){return [id, 'no hay resultados']}

        return [findid]
    }
        

    async Create(data):Promise<typeServices>{
        const NewData = await this.Model.create(data);
        return NewData
    }
      
    
    async Update(id, data ):Promise<typeServices[]>{
        const update = await this.Model.update(data, {where: {unique_id: id}})
        return data
    }
    
        
    async delete(id, data):Promise<typeServices[]>{
        const eliminate = await this.Model.update(data, {where: {unique_id: id}})
        return [id, data]
    }
}

