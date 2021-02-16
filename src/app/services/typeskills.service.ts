import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TypeSkills } from 'src/models/model/typeSkills';
import { PaginationOptionsInterface } from '../complements/interface/paginator.interface';
import { businessUnit } from "src/models/model/businessUnit";
import { roles } from "src/models/model/role";
import { typeIdentificationDocument } from 'src/models/model/type-Identification-Document';

@Injectable()
export class TypeskillsService {
    constructor(
        @InjectModel(TypeSkills)
        private readonly Model: typeof TypeSkills,
    ){}

    async getAll(options: PaginationOptionsInterface): Promise<any>{
        const {count, rows} = await this.Model.findAndCountAll({
        limit: options.limits,
        offset: options.pages,
        //@ts-ignore
        include: [{model: businessUnit, include: [roles]}],
        });
 
      return {rows, count};
    }
          
    async findById(id):Promise<TypeSkills[]>{
        //@ts-ignore
        const findid = await this.Model.findOne({where: {unique_id: id}, include: [{model: businessUnit, include: [roles]},{model: typeIdentificationDocument}] })
        if (findid == null){return [id, 'no hay resultados']}

        return [findid]
    }
        

    async Create(data):Promise<TypeSkills>{
        const NewData = await this.Model.create(data);
        return NewData
    }
      
    
    async Update(id, data ):Promise<TypeSkills[]>{
        const update = await this.Model.update(data, {where: {unique_id: id}})
        return data
    }
    
        
    async delete(id, data):Promise<TypeSkills[]>{
        const eliminate = await this.Model.update(data, {where: {unique_id: id}})
        return [id, data]
    }
}

