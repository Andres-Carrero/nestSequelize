import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { thirdWalletYsap } from 'src/models/model/ysap/thirdWalletYsap';

@Injectable()
export class YsapThirdWalletService { 
    constructor(
        @InjectModel(thirdWalletYsap)
        private readonly Model: typeof thirdWalletYsap,
    ){}



async getAll():Promise<any>{
    const data = await this.Model.findAll({where: {status: true}})
    return data
}

async getId(id):Promise<any>{
    const data = await this.Model.findAll({where: {id: id}})
    return data
}


          



}
