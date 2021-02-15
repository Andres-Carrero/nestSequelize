import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contract } from "src/models/model/contract";
import { PaginationOptionsInterface } from "src/app/complements/interface/paginator.interface";
import { Process } from "src/models/model/process";
import { businessUnit } from 'src/models/model/businessUnit';


@Injectable()
export class ContractService {
    constructor(
        @InjectModel(Contract)
        private readonly Model: typeof Contract,
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
          
    async findById(id):Promise<Contract[]>{
        //@ts-ignore
        const findid = await this.Model.findOne({where: {unique_id: id}, include: [businessUnit]})
        if (findid == null){return [id, 'no hay resultados']}

        return [findid]
    }
        

    async Create(data):Promise<Contract>{
        const NewData = await this.Model.create(data);
        return NewData
    }
      
    
    async Update(id, data ):Promise<Contract[]>{
        const update = await this.Model.update(data, {where: {unique_id: id}})
        return data
    }
    
        
    async delete(id, data):Promise<Contract[]>{
        const eliminate = await this.Model.update(data, {where: {unique_id: id}})
        return [id, data]
    }
}

