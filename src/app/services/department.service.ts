import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Country } from 'src/models/model/country';
import { Departments } from 'src/models/model/departments';
import { PaginationOptionsInterface } from '../complements/interface/paginator.interface';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectModel(Departments)
        private readonly Model: typeof Departments,
    ){}

    async getAll(options: PaginationOptionsInterface): Promise<any>{
        const {count, rows} = await this.Model.findAndCountAll({
        limit: options.limits,
        offset: options.pages,
        //@ts-ignore
        include: [Country]
        });
 
      return {rows, count};
    }
          
    async findById(id):Promise<Departments[]>{
        //@ts-ignore
        const findid = await this.Model.findOne({where: {unique_id: id}, include: [Country]  })
        if (findid == null){return [id, 'no hay resultados']}

        return [findid]
    }
        

    async Create(data):Promise<Departments>{
        const NewData = await this.Model.create(data);
        return NewData
    }
      
    
    async Update(id, data ):Promise<Departments[]>{
        const update = await this.Model.update(data, {where: {unique_id: id}})
        return data
    }
    
        
    async delete(id, data):Promise<Departments[]>{
        const eliminate = await this.Model.update(data, {where: {unique_id: id}})
        return [id, data]
    }
}

