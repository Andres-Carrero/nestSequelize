import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { businessUnit } from 'src/models/model/businessUnit';
import { typeDocVehicles } from 'src/models/model/typeDocVehicles';
import { Vehicles } from 'src/models/model/vehicles';
import { PaginationOptionsInterface } from '../complements/interface/paginator.interface';

@Injectable()
export class VehiclesService {
    constructor(
        @InjectModel(Vehicles)
        private readonly Model: typeof Vehicles,
    ){}

    async getAll(options: PaginationOptionsInterface): Promise<any>{
        const {count, rows} = await this.Model.findAndCountAll({
        limit: options.limits,
        offset: options.pages,
        //@ts-ignore
        include: [businessUnit, typeDocVehicles]
        });
 
      return {rows, count};
    }
          
    async findById(id):Promise<Vehicles[]>{
        //@ts-ignore
        const findid = await this.Model.findOne({where: {unique_id: id}, include: [businessUnit, typeDocVehicles]})
        if (findid == null){return [id, 'no hay resultados']}

        return [findid]
    }
        

    async Create(data):Promise<Vehicles>{
        const NewData = await this.Model.create(data);
        return NewData
    }
      
    
    async Update(id, data ):Promise<Vehicles[]>{
        const update = await this.Model.update(data, {where: {unique_id: id}})
        return data
    }
    
        
    async delete(id, data):Promise<Vehicles[]>{
        const eliminate = await this.Model.update(data, {where: {unique_id: id}})
        return data
    }
}

