import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Commune } from 'src/models/model/commune';
import { Upz } from 'src/models/model/upz';
import { PaginationOptionsInterface } from '../complements/interface/paginator.interface';
import { Departments } from "src/models/model/departments";
import { Country } from "src/models/model/country";
import { City } from 'src/models/model/city';



@Injectable()
export class UpzService {
    constructor(
        @InjectModel(Upz)
        private readonly Model: typeof Upz,
        
    ){}

    async getAll(options: PaginationOptionsInterface): Promise<any>{
        const {count, rows} = await this.Model.findAndCountAll({
        limit: options.limits,
        offset: options.pages,
        //@ts-ignore
        include: [{model: Commune, include: [{model: City, include: [{model: Departments, include: [{model: Country}] }]    }]    }]
        });
 
      return {rows, count};
    }
          
    async findById(id):Promise<Upz[]>{
        //@ts-ignore
        const findid = await this.Model.findOne({where: {unique_id: id}, 
            include: [{model: Commune, 
                include: [{model: City, 
                    include: [{model: Departments, 
                        include: [{model: Country}] 
                    }]    
                }]    
            }]  
        })
        if (findid == null){return [id, 'no hay resultados']}

        return [findid]
    }
        

    async Create(data):Promise<Upz>{
        const NewData = await this.Model.create(data);
        return NewData
    }
      
    
    async Update(id, data ):Promise<Upz[]>{
        const update = await this.Model.update(data, {where: {unique_id: id}})
        return data
    }
    
        
    async delete(id, data):Promise<Upz[]>{
        const eliminate = await this.Model.update(data, {where: {unique_id: id}})
        return [id, data]
    }
}

