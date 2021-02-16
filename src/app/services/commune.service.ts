import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { City } from 'src/models/model/city';
import { Commune } from 'src/models/model/commune';
import { PaginationOptionsInterface } from '../complements/interface/paginator.interface';
import { Departments } from "src/models/model/departments";
import { Country } from "src/models/model/country";

@Injectable()
export class CommuneService {
    constructor(
        @InjectModel(Commune)
        private readonly Model: typeof Commune,
        
    ){}

    async getAll(options: PaginationOptionsInterface): Promise<any>{
        const {count, rows} = await this.Model.findAndCountAll({
        limit: options.limits,
        offset: options.pages,
        //@ts-ignore
        include: [{model: City, include: [{model: Departments, include: [{model: Country}]  }]  } ]
        });
 
      return {rows, count};
    }
          
    async findById(id):Promise<Commune[]>{
        //@ts-ignore
        const findid = await this.Model.findOne({where: {unique_id: id}, 
            include: [
                {model: City, include: 
                    [{model: Departments, include: 
                        [{model: Country}]  
                    }]  
                } 
            ]  
        })
        if (findid == null){return [id, 'no hay resultados']}

        return [findid]
    }
        

    async Create(data):Promise<Commune>{
        const NewData = await this.Model.create(data);
        return NewData
    }
      
    
    async Update(id, data ):Promise<Commune[]>{
        const update = await this.Model.update(data, {where: {unique_id: id}})
        return data
    }
    
        
    async delete(id, data):Promise<Commune[]>{
        const eliminate = await this.Model.update(data, {where: {unique_id: id}})
        return [id, data]
    }
}

