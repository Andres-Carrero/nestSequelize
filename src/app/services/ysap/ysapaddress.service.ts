import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaginationOptionsInterface } from 'src/app/complements/interface/paginator.interface';
import { addressYsap } from 'src/models/model/ysap/addressYsap';

@Injectable()
export class YsapAddressService { 
    constructor(
        @InjectModel(addressYsap)
        private readonly Model: typeof addressYsap,
    ){}


async Create(data):Promise<addressYsap>{
    const NewData = await this.Model.create(data);
    return NewData
}


async getAll(options: PaginationOptionsInterface): Promise<any>{
    const {count, rows} = await this.Model.findAndCountAll({
    limit: options.limits,
    order: [['id', options.orden]],
    offset: options.pages,
    });
 

    return {rows, count};
}
          



}
