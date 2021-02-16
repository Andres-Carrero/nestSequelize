import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { City } from 'src/models/model/city';
import { Departments } from 'src/models/model/departments';
import { PaginationOptionsInterface } from '../complements/interface/paginator.interface';
import { Country } from "src/models/model/country";

@Injectable()
export class CityService {
    constructor(
        @InjectModel(City)
        private readonly Model: typeof City,
    ){}

    async getAll(options: PaginationOptionsInterface): Promise<any>{
        const {count, rows} = await this.Model.findAndCountAll({
        limit: options.limits,
        offset: options.pages,
        //@ts-ignore
        include: [{model: Departments, include: [Country]  } ]
        });
 
      return {rows, count};
    }
          
    async findById(id):Promise<City[]>{
        //@ts-ignore
        const findid = await this.Model.findOne({where: {unique_id: id}, include: [{model: Departments, include: [Country]  }   ]  })
        if (findid == null){return [id, 'no hay resultados']}

        return [findid]
    }
        

    async Create(data):Promise<City>{
        const NewData = await this.Model.create(data);
        return NewData
    }
      
    
    async Update(id, data ):Promise<City[]>{
        const update = await this.Model.update(data, {where: {unique_id: id}})
        return data
    }
    
        
    async delete(id, data):Promise<City[]>{
        const eliminate = await this.Model.update(data, {where: {unique_id: id}})
        return [id, data]
    }
}

