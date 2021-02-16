import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TypeProfessional } from 'src/models/model/typeProfessional';
import { PaginationOptionsInterface } from '../complements/interface/paginator.interface';

@Injectable()
export class TypeProfessionalService {
    constructor(
        @InjectModel(TypeProfessional)
        private readonly Model: typeof TypeProfessional,
    ){}

    async getAll(options: PaginationOptionsInterface): Promise<any>{
        const {count, rows} = await this.Model.findAndCountAll({
        limit: options.limits,
        offset: options.pages,
        });
 
      return {rows, count};
    }
          
    async findById(id):Promise<TypeProfessional[]>{
        const findid = await this.Model.findOne({where: {unique_id: id} })
        if (findid == null){return [id, 'no hay resultados']}

        return [findid]
    }
        

    async Create(data):Promise<TypeProfessional>{
        const NewData = await this.Model.create(data);
        return NewData
    }
      
    
    async Update(id, data ):Promise<TypeProfessional[]>{
        const update = await this.Model.update(data, {where: {unique_id: id}})
        return data
    }
    
        
    async delete(id, data):Promise<TypeProfessional[]>{
        const eliminate = await this.Model.update(data, {where: {unique_id: id}})
        return [id, data]
    }
}

