import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { configUsers } from 'src/models/model/configUser';

@Injectable()
export class ConfigUserService {
    constructor(
        @InjectModel(configUsers)
        private readonly Model: typeof configUsers,
    ){}

    /*async paginate(options: PaginationOptionsInterface,): Promise<Pagination<configUsersRepository>> {
        const [results, total] = await this.Model.findAndCount({where: {state: true},
            take: options.limit,
            skip: options.page, 
        });
        
        return new Pagination<configUsersRepository>({
            results,
            total,
        });
    }*/


    async findById(id):Promise<configUsers[]>{
        const findid = await this.Model.findOne({where: {id}})
        if (findid == null){return [id, 'no hay resultados']}

        return [findid]
    }
    
    
    async Create(data):Promise<configUsers>{
        const NewData = await this.Model.create(data);
        return NewData
    }
    
    
    async Update(id, data ):Promise<configUsers[]>{
        const update = await this.Model.update(data, {where: {id}})
        return data
    }
    
    
    async delete(id, data):Promise<configUsers[]>{
        const eliminate = await this.Model.update(data, {where: {id}})
        return [id, data]
    }

 
}


