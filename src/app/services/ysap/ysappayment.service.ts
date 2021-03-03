import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaginationOptionsInterface } from 'src/app/complements/interface/paginator.interface';
import { paymentYsap } from 'src/models/model/ysap/paymentYsap';

@Injectable()
export class YsapPaymentService { 
    constructor(
        @InjectModel(paymentYsap)
        private readonly Model: typeof paymentYsap,
    ){}


async Create(data):Promise<paymentYsap>{
    const NewData = await this.Model.create(data);
    return NewData
}


async findById(id):Promise<paymentYsap>{  

    const findid = await this.Model.findOne({   where: {idtransaction: id} })

    if (findid == null || !findid){
        throw new Error("Pago no encontrado")
    }

    
     return findid
}


async getAll(options: PaginationOptionsInterface): Promise<any>{
    const {count, rows} = await this.Model.findAndCountAll({
    limit: options.limits,
    order: [['dateTime', options.orden]],
    offset: options.pages,
    });
 

    return {rows, count};
}
          



}
