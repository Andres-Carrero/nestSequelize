import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { professionals } from 'src/models/model/professionals';
import { PaginationOptionsInterface } from '../complements/interface/paginator.interface';
import { businessUnit } from "src/models/model/businessUnit";
import { TypeSkills } from "src/models/model/typeSkills";
import { roles } from "src/models/model/role";
import { typeIdentificationDocument } from "src/models/model/type-Identification-Document";

@Injectable()
export class ProfessionalService {
    constructor(
        @InjectModel(professionals)
        private readonly Model: typeof professionals,
    ){}

    async getAll(options: PaginationOptionsInterface): Promise<any>{
        
        const {count, rows} = await this.Model.findAndCountAll({
        limit: options.limits,
        offset: options.pages,
        //@ts-ignore
        include: [{model:typeIdentificationDocument},{model: businessUnit, include: [roles]},{model:TypeSkills} ]
        });
 
      return {rows, count};
    }
          
    async findById(id):Promise<professionals[]>{
        //@ts-ignore
        const findid = await this.Model.findOne({where: {unique_id: id}, 
            include: [  {model:typeIdentificationDocument},
                        {model: businessUnit, include: [roles]},
                        {model:TypeSkills} 
                    ]
        })
        if (findid == null){return [id, 'no hay resultados']}

        return [findid]
    }
        

    async Create(data):Promise<professionals>{
        const NewData = await this.Model.create(data);
        return NewData
    }
      
    
    async Update(id, data ):Promise<professionals[]>{
        const update = await this.Model.update(data, {where: {unique_id: id}})
        return data
    }
    
        
    async delete(id, data):Promise<professionals[]>{
        const eliminate = await this.Model.update(data, {where: {unique_id: id}})
        return [id, data]
    }
}

