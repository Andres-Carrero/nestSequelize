import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Crew } from 'src/models/model/crew';
import { PaginationOptionsInterface } from '../complements/interface/paginator.interface';
import { professionals } from "src/models/model/professionals";

@Injectable()
export class CrewService  {
    constructor(
        @InjectModel(Crew)
        private readonly Model: typeof Crew,
    ){}

    async getAll(options: PaginationOptionsInterface): Promise<any>{
        const {count, rows} = await this.Model.findAndCountAll({
        limit: options.limits,
        offset: options.pages,
        //@ts-ignore
        include: [{model: professionals}]
        });
 
      return {rows, count};
    }
          
    async findById(id):Promise<Crew[]>{
        //@ts-ignore
        const findid = await this.Model.findOne({where: {unique_id: id}, include: [{model: professionals}] })
        if (findid == null){return [id, 'no hay resultados']}

        return [findid]
    }
        

    async Create(data):Promise<Crew>{
        const NewData = await this.Model.create(data);
        return NewData
    }
      
    
    async Update(id, data ):Promise<Crew[]>{
        const update = await this.Model.update(data, {where: {unique_id: id}})
        return data
    }
    
        
    async delete(id, data):Promise<Crew[]>{
        const eliminate = await this.Model.update(data, {where: {unique_id: id}})
        return [id, data]
    }
}

